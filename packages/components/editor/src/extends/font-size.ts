// 设置更多的样式插件
import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/vue-3'

export type FontSizeOptions = {
    /**
     * @default ['textStyle']
     * @example ['12px']
     */
    types: string[]
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        TextStylePlus: {
            /**
             * 设置 fontSize
             */
            setFontSize: (fontSize: string) => ReturnType
            /**
             * 取消 fontSize
             */
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSize = Extension.create<FontSizeOptions>({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'] // 应用于 TextStyle
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize || null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }
                            return { style: `font-size: ${attributes.fontSize}` }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize:
                fontSize =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize }).run()
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain()
                        .setMark('textStyle', { fontSize: null })
                        .removeEmptyTextStyle()
                        .run()
                }
        }
    }
})

export default FontSize