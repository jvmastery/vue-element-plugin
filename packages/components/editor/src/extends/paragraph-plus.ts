// 设置更多的样式插件
import { Node } from '@tiptap/vue-3'

export type Direction = 'ltr' | 'rtl'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        ParagraphPlus: {
            /**
             * 设置文本方向
             * @param direction 方向
             * @returns
             */
            setTextDirection: (direction: Direction) => ReturnType
            /**
             * 设置首行缩进
             * @param indent 缩进
             * @returns
             */
            setTextIndent: (indent: string) => ReturnType
            /**
             * 移除缩进
             * @returns
             */
            removeTextIndent: () => ReturnType
        }
    }
}

export const ParagraphPlus = Node.create({
    name: 'paragraphPlus',
    group: 'block',
    content: 'inline*',
    defining: true,

    addAttributes() {
        return {
            dir: {
                default: null,
                parseHTML: element => element.getAttribute('dir') || null,
                renderHTML: attributes => {
                    if (!attributes.dir) {
                        return {}
                    }

                    return {
                        dir: attributes.dir,
                        style: `direction: ${attributes.dir};`
                    }
                }
            },
            textIndent: {
                default: null,
                parseHTML: element => element.style.textIndent || null,
                renderHTML: attributes => {
                    if (!attributes.textIndent) {
                        return {}
                    }

                    return {
                        style: `text-indent: ${attributes.textIndent};`
                    }
                }
            }
        }
    },
    parseHTML() {
        return [{ tag: 'p' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['p', HTMLAttributes, 0]
    },

    addCommands() {
        return {
            setTextDirection:
                (direction: Direction) =>
                ({ chain }) => {
                    return chain().setNode(this.name, { dir: direction }).run()
                },
            setTextIndent:
                (value: string | null) =>
                ({ chain }) => {
                    return chain().setNode(this.name, { textIndent: value }).run()
                },
            removeTextIndent:
                () =>
                ({ chain }) => {
                    return chain().setNode(this.name, { textIndent: null }).run()
                }
        }
    }
})

export default ParagraphPlus
