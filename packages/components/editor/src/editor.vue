<script setup lang="ts">
import toolbar from './toolbar.vue'
import { EditorInstanceSymbol } from './editor'

import { useEditor, EditorContent, Extension } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import { BulletList } from '@tiptap/extension-bullet-list'
import { CharacterCount } from '@tiptap/extension-character-count'
// import { CodeBlock } from '@tiptap/extension-code-block'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
// import { Document } from '@tiptap/extension-document'
// import { Dropcursor } from '@tiptap/extension-dropcursor'
import { FocusClasses } from '@tiptap/extension-focus'
import { FontFamily } from '@tiptap/extension-font-family'
// import { Heading } from '@tiptap/extension-heading'
import { Highlight } from '@tiptap/extension-highlight'
// import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
// import { OrderedList } from '@tiptap/extension-ordered-list'
// import { Paragraph } from '@tiptap/extension-paragraph'
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

import { all, createLowlight } from 'lowlight'
const lowlight = createLowlight(all)
import 'highlight.js/styles/github.css'
import { provide } from 'vue'

import { CustomOrderedList } from './extends/ordered-list'
import { CustomBulletList } from './extends/bullet-list'
import { FontSize } from './extends/font-size'
import { ParagraphPlus } from './extends/paragraph-plus'
import { ImageProgress } from './extends/image-progress'

defineOptions({
    name: 'FEditor'
})

const content = defineModel()

const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [
        StarterKit,
        // BulletList,
        CharacterCount,
        // CodeBlock,
        CodeBlockLowlight.configure({
            lowlight
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
        })
    ],
    onSelectionUpdate({ editor }) {
        console.log('select update')
    }
})

provide(EditorInstanceSymbol, editor)

// 定义所有的工具栏
const toolbars = [
    {
        name: 'bold',
        displayName: '加粗',
        position: '0 0',
        click: () => {
            editor.value?.chain().focus().toggleBold().run()
        }
    },
    {
        name: 'italic',
        displayName: '斜体',
        position: '-60px 0',
        click: () => {
            editor.value?.chain().focus().toggleItalic().run()
        }
    },
    {
        name: 'fontborder',
        position: '-160px -40px',
        click: () => {}
    },
    {
        name: 'underline',
        displayName: '下划线',
        position: '-140px 0',
        click: () => {
            editor.value?.chain().focus().toggleUnderline().run()
        }
    },
    {
        name: 'strike',
        displanName: '删除线',
        position: '-120px 0',
        click: () => {
            editor.value?.chain().focus().toggleStrike().run()
        }
    },
    {
        name: 'subscript',
        displayName: '下标',
        position: '-600px 0',
        click: () => {
            editor.value?.chain().focus().toggleSubscript().run()
        }
    },
    {
        name: 'superscript',
        displayName: '上标',
        position: '-620px 0',
        click: () => {
            editor.value?.chain().focus().toggleSuperscript().run()
        }
    },
    {
        name: 'blockquote',
        displayName: '引用',
        position: '-220px 0',
        click: () => {}
    },
    {
        name: 'forecolor',
        displayName: '字体颜色',
        position: '-720px 0',
        click: () => {}
    },
    {
        name: 'backcolor',
        displayName: '背景色',
        position: '-760px 0',
        click: () => {}
    },
    {
        name: 'inserttable',
        displayName: '插入表格',
        position: '-580px -20px',
        click: () => {}
    },
    {
        name: 'autotypeset',
        displayName: '自动排版',
        position: '-640px -40px',
        click: () => {}
    },
    {
        name: 'justifyleft',
        displayName: '居左对齐',
        position: '-460px 0',
        click: () => {}
    },
    {
        name: 'justifycenter',
        displayName: '居中对齐',
        position: '-420px 0',
        click: () => {}
    },
    {
        name: 'justifyright',
        displayName: '居右对齐',
        position: '-480px 0',
        click: () => {}
    },
    {
        name: 'justifyjustify',
        displayName: '两端对齐',
        position: '-440px 0',
        click: () => {}
    },
    {
        name: 'insertorderedlist',
        displayName: '有序列表',
        position: '-80px 0',
        click: () => {}
    },
    {
        name: 'insertunorderedlist',
        displayName: '无序列表',
        position: '-20px 0',
        click: () => {}
    },
    {
        name: 'lineheight',
        displayName: '行间距',
        position: '-725px -40px',
        click: () => {}
    },
    {
        name: 'horizontal',
        displayName: '分割线',
        position: '-360px 0',
        click: () => {
            editor.value?.chain().focus().setHorizontalRule().run()
        }
    },
    {
        name: 'link',
        displayName: '超链接',
        position: '-500px 0',
        click: () => {
            editor.value?.chain().focus().setHorizontalRule().run()
        }
    }
]
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
            <editor-content :editor="editor" />
        </div>
        <div class="footer__wrapper">1</div>
    </div>
</template>

<style lang="scss" scoped>
.editor__container {
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
    }

    .footer__wrapper {
    }
}

::v-deep(.tiptap) {
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
}
</style>
