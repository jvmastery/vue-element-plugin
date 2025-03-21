<script setup lang="ts">
import toolbar from './toolbar.vue'
import { EditorInstanceSymbol } from './editor'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-vue-3'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import NodeRange from '@tiptap-pro/extension-node-range'
import { CharacterCount } from '@tiptap/extension-character-count'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import { FocusClasses } from '@tiptap/extension-focus'
import { FontFamily } from '@tiptap/extension-font-family'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Table } from '@tiptap/extension-table'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableRow } from '@tiptap/extension-table-row'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import FileHandler from '@tiptap-pro/extension-file-handler'

import { all, createLowlight } from 'lowlight'
const lowlight = createLowlight(all)
import 'highlight.js/styles/github.css'
import { provide, watch } from 'vue'

import { CustomOrderedList } from './extends/ordered-list'
import { CustomBulletList } from './extends/bullet-list'
import { FontSize } from './extends/font-size'
import { ParagraphPlus } from './extends/paragraph-plus'
import { ImageProgress } from './extends/image-progress'
import { uploadImage } from './toolbar/file/upload'
import 'katex/dist/katex.min.css'

import { Delete, CopyDocument } from '@element-plus/icons-vue'

defineOptions({
    name: 'FEditor'
})

const content = defineModel<string>()
const props = withDefaults(defineProps<{
    placeholder?: string
}>(), {
    placeholder: ''
})

const editor = useEditor({
    content: content.value,
    extensions: [
        StarterKit.configure({
            orderedList: false,
            bulletList: false,
            codeBlock: false
        }),
        NodeRange.configure({
            // allow to select only on depth 0
            // depth: 0,
            key: null
        }),
        // BulletList,
        CharacterCount,
        // CodeBlock,
        CodeBlockLowlight.configure({
            lowlight
        }),
        Placeholder.configure({
            placeholder: props.placeholder
        }),
        Color,
        // Document,
        // Dropcursor,
        FocusClasses,
        FontFamily,
        // Heading,
        Highlight.configure({ multicolor: true }),
        // HorizontalRule,
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                rel: null,
                target: null
            }
        }),
        // OrderedList,
        // Paragraph,
        Placeholder,
        Subscript,
        Superscript,
        Table,
        TableHeader,
        TableCell,
        TableRow,
        TaskItem,
        TaskList,
        TextAlign.configure({
            types: ['heading', 'paragraph', 'paragraphPlus']
        }),
        TextStyle,
        Typography,
        Underline,
        CustomOrderedList.configure(),
        CustomBulletList.configure(),
        FontSize,
        ParagraphPlus,
        ImageProgress.configure({
            inline: true
        }),
        FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor, files, pos) => {
                files.forEach(file => {
                    uploadImage(currentEditor, file, pos)
                })
            },
            onPaste: (currentEditor, files, htmlContent) => {
                files.forEach(file => {
                    console.log('paste')
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        return false
                    }
                    uploadImage(currentEditor, file)
                })
            }
        }),
        Mathematics
    ],
    onUpdate: () => {
        content.value = editor.value?.getHTML()
    },
    editorProps: {
        // transformPastedHTML() {
        //     const doc = new DOMParser().parseFromString(html, 'text/html')
        //     const images = doc.querySelectorAll('img')
        //     images.forEach(async img => {
        //         if (img.src.startsWith('data:image')) {
        //             const file = await dataURLtoFile(img.src)
        //             const url = await uploadImage(file) // 上传并返回URL
        //             img.src = url // 替换成服务器存储路径
        //         }
        //     })
        //     return doc.body.innerHTML
        // }
    }
})
const bubbleMenuTools = [
    'bold',
    'italic',
    'underline',
    'strike',
    'subscript',
    'superscript',
    'removeformat',
    'color',
    'backgroudColor',
    'fontFamily',
    'fontSize'
]

watch(content, () => {
    const isSame = editor?.value?.getHTML() === content.value
    if (isSame) {
        return
    }

    editor.value?.commands.setContent(content.value ?? '', false)
})

provide(EditorInstanceSymbol, editor)
</script>

<template>
    <div class="editor__container">
        <div class="toolbar__wrapper">
            <!-- <div v-for="item in toolbars" :style="{
                backgroundPosition: item.position
            }" :class="['item', 'icon', item.name, editor?.isActive(item.name) ? 'is-active' : '']" @click="item.click" ></div> -->
            <toolbar :editor="editor" />
        </div>
        <div class="content__wrapper">
            <BubbleMenu
                v-if="editor"
                :editor="editor"
                :tippy-options="{ placement: 'top-start', maxWidth: 'none' }"
            >
                <div class="bubble-menu toolbar__wrapper">
                    <toolbar :editor="editor" :tools="bubbleMenuTools" />
                </div>
            </BubbleMenu>
            <DragHandle v-if="editor" :editor="editor" :tippy-options="{ offset: [2, 5] }">
                <div class="drag-buttons">
                    <!-- <el-popover
                        placement="bottom"
                        title="Title"
                        :width="200"
                        trigger="click"
                        content="this is content, this is content, this is content"
                    >
                        <template #reference>
                            <svg
                                t="1742542723016"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="6416"
                                width="16"
                                height="16"
                            >
                                <path
                                    d="M802.909091 488.727273H558.545455V244.363636a34.909091 34.909091 0 1 0-69.818182 0V488.727273H244.363636a34.909091 34.909091 0 1 0 0 69.818182H488.727273v244.363636a34.909091 34.909091 0 1 0 69.818182 0V558.545455h244.363636a34.909091 34.909091 0 1 0 0-69.818182"
                                    fill="#797979"
                                    p-id="6417"
                                ></path>
                            </svg>
                        </template>
                    </el-popover> -->
                    <!-- <el-popover
                        placement="bottom"
                        title="Title"
                        :width="200"
                        trigger="click"
                        content="this is content, this is content, this is content"
                    >
                        <template #reference>
                            <div class="icon-outer">
                                <svg
                                    t="1742528975348"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="5330"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M409.6 102.4a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4zM409.6 512a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4zM409.6 921.6a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z"
                                        fill="#BBBBBB"
                                        p-id="5331"
                                    ></path>
                                </svg>
                            </div>
                        </template>
                    </el-popover> -->
                    <el-dropdown placement="bottom-start" trigger="click" :teleported="false">
                        <div class="icon-outer">
                            <svg
                                t="1742528975348"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="5330"
                                width="0.8em"
                                height="0.8em"
                            >
                                <path
                                    d="M409.6 102.4a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4zM409.6 512a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4zM409.6 921.6a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z m409.6 0a102.4 102.4 0 1 1-102.4-102.4 102.4 102.4 0 0 1 102.4 102.4z"
                                    fill="#BBBBBB"
                                    p-id="5331"
                                ></path>
                            </svg>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>清除格式</el-dropdown-item>
                                <el-dropdown-item :icon="CopyDocument">复制节点</el-dropdown-item>
                                <el-dropdown-item divided>
                                    <el-icon color="#ff0202">
                                        <Delete />
                                    </el-icon>
                                    删除
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </DragHandle>
            <editor-content class="editor-content" :editor="editor" />
        </div>
        <div class="footer__wrapper">
            <div class="word">
                当前已输入{{ editor?.storage.characterCount.characters() }}个字符
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.editor__container {
    --white: #fff;
    --black: #2e2b29;
    --black-contrast: #110f0e;
    --gray-1: rgba(61, 37, 20, 0.05);
    --gray-2: rgba(61, 37, 20, 0.08);
    --gray-3: rgba(61, 37, 20, 0.12);
    --gray-4: rgba(53, 38, 28, 0.3);
    --gray-5: rgba(28, 25, 23, 0.6);
    --green: #22c55e;
    --purple: #6a00f5;
    --purple-contrast: #5800cc;
    --purple-light: rgba(88, 5, 255, 0.05);
    --yellow-contrast: #facc15;
    --yellow: rgba(250, 204, 21, 0.4);
    --yellow-light: #fffae5;
    --red: #ff5c33;
    --red-light: #ffebe5;
    --shadow: 0px 12px 33px 0px rgba(0, 0, 0, 0.06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04);

    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    border: 1px solid #d4d4d4;

    .toolbar__wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#f2f2f2));
        background-image: -webkit-linear-gradient(top, #ffffff, #f2f2f2);
        background-image: -o-linear-gradient(top, #ffffff, #f2f2f2);
        background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);
        border-bottom: 1px solid #d4d4d4;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
        padding: 5px;

        .item {
            margin: 1px;
            height: 20px;
            border: none;
            padding: 0;
            margin: 0;
            overflow: hidden;
            margin: 2px;

            &.icon {
                height: 20px !important;
                width: 20px !important;
                background-image: url(../images/icons.png);

                &.is-active {
                    background-color: #ffe69f;
                    padding: 0;
                    border: 1px solid #dcac6c;
                    border-radius: 2px;
                }
            }
        }
    }

    .content__wrapper {
        flex: 1 1 0%;
        overflow-y: auto;
        display: flex;

        .editor-content {
            flex: 1 1 0%;
            overflow-y: auto;
        }
    }

    .footer__wrapper {
        border-top: 1px solid #d4d4d4;

        .word {
            white-space: nowrap;
            line-height: 20px;
            font-size: 12px;
            font-family: Arial, Helvetica, Tahoma, Verdana, Sans-Serif;
            text-align: right;
            margin-right: 5px;
            color: #aaa;
        }
    }

    .bubble-menu {
        background-color: var(--white) !important;
        border: 1px solid #d4d4d4 !important;
        box-shadow: var(--shadow);
        display: flex;
        padding: 0.2rem;

        button {
            background-color: unset;

            &:hover {
                background-color: var(--gray-3);
            }

            &.is-active {
                background-color: var(--purple);

                &:hover {
                    background-color: var(--purple-contrast);
                }
            }
        }
    }

    .drag-handle {
        .drag-buttons {
            display: flex;

            .icon-outer {
                align-items: center;
                cursor: grab;
                display: flex;
                justify-content: center;
                padding: 3px;

                &:hover {
                    background: #f0f0f0;
                    border-radius: 0.25rem;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
            }
        }
    }

    ::v-deep(.tiptap) {
        margin: 8px;
        padding-inline: 25px;
        min-height: 100%;

        p.is-editor-empty:first-child::before {
            color: var(--gray-4);
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        .ProseMirror-noderangeselection {
            *::selection {
                background: transparent;
            }

            * {
                caret-color: transparent;
            }
        }

        .ProseMirror-selectednode,
        .ProseMirror-selectednoderange {
            position: relative;

            &::before {
                position: absolute;
                pointer-events: none;
                z-index: -1;
                content: '';
                top: -0.25rem;
                left: -0.25rem;
                right: -0.25rem;
                bottom: -0.25rem;
                background-color: #70cff850;
                border-radius: 0.2rem;
            }
        }

        ::selection {
            background-color: #70cff850;
        }

        &.ProseMirror:focus {
            outline: none;
        }

        :first-child {
            margin-top: 0;
        }

        /* List styles */
        ul,
        ol {
            padding: 0 1rem;
            margin: 1.25rem 1rem 1.25rem 0.4rem;

            li p {
                margin-top: 0.25em;
                margin-bottom: 0.25em;
            }
        }

        ol[type^='simp-chinese-'] {
            padding-left: 2em;
        }

        /* Heading styles */

        /* Code and preformatted text styles */
        code {
            background-color: var(--purple-light);
            border-radius: 0.4rem;
            color: var(--black);
            font-size: 0.85rem;
            padding: 0.25em 0.3em;
        }

        pre {
            background: var(--black);
            border-radius: 0.5rem;
            color: var(--white);
            font-family: 'JetBrainsMono', monospace;
            margin: 1.5rem 0;
            padding: 0.75rem 1rem;

            code {
                background: none;
                color: inherit;
                font-size: 0.8rem;
                padding: 0;
            }
        }

        blockquote {
            border-left: 3px solid var(--gray-3);
            margin: 1.5rem 0;
            padding-left: 1rem;
        }

        hr {
            border: none;
            border-top: 1px solid var(--gray-2);
            margin: 2rem 0;
        }

        img {
            max-width: 100%;
            display: inline;

            &.ProseMirror-selectednode {
                outline: 3px solid var(--purple);
            }
        }

        .image-wrapper {
            position: relative;
            display: inline-block;
            opacity: 0.7;

            &[data-loading='true'] {
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3); /* 30% 透明度 */
                    z-index: 1;
                    border-radius: inherit;
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40%; /* 默认圆圈占宽度的60% */
                    max-width: 300px; /* 防止圆圈超出图片宽度的 60% */
                    min-width: 100px;
                    aspect-ratio: 1 / 1; /* 强制圆圈为正圆 */
                    border: 5px solid white; /* 圆圈边框 */
                    border-top-color: transparent; /* 让上部分透明形成旋转效果 */
                    border-radius: 50%; /* 保证是圆形 */
                    transform: translate(-50%, -50%);
                    animation: spin 1s linear infinite;
                    z-index: 2;
                }

                /* 旋转动画 */
                @keyframes spin {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                .progress-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 2em; /* 字体大小根据图片变化，但不会超出圆圈的50% */
                    max-font-size: 50%; /* 字体最大不超过圆圈的50% */
                    font-weight: bold;
                    z-index: 3;
                    white-space: nowrap;
                }
            }
        }

        /* Table-specific styling */
        table {
            border-collapse: collapse;
            margin: 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;

            td,
            th {
                border: 1px solid var(--gray-3);
                box-sizing: border-box;
                min-width: 1em;
                padding: 6px 8px;
                position: relative;
                vertical-align: top;

                > * {
                    margin-bottom: 0;
                }
            }

            th {
                background-color: var(--gray-1);
                font-weight: bold;
                text-align: left;
            }

            .selectedCell:after {
                background: var(--gray-2);
                content: '';
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                pointer-events: none;
                position: absolute;
                z-index: 2;
            }

            .column-resize-handle {
                background-color: var(--purple);
                bottom: -2px;
                pointer-events: none;
                position: absolute;
                right: -2px;
                top: 0;
                width: 4px;
            }
        }

        .tableWrapper {
            margin: 1.5rem 0;
            overflow-x: auto;
        }

        &.resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
        }
    }
}
</style>
