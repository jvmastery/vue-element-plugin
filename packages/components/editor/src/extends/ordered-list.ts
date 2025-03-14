import OrderedList from '@tiptap/extension-ordered-list'

/**
 * 自定义编号格式
 */
export const CustomOrderedList = OrderedList.extend({
    addAttributes() {
        return {
            type: {
                default: 'decimal', // 默认使用阿拉伯数字
                parseHTML: element => element.style.listStyleType || 'decimal',
                renderHTML: attributes => {
                    return {
                        style: `list-style-type: ${attributes.type}`
                    }
                }
            }
        }
    }
})
