import BulletList from '@tiptap/extension-bullet-list'

/**
 * 自定义编号格式
 */
export const CustomBulletList = BulletList.extend({
    addAttributes() {
        return {
            type: {
                default: 'disc', // 默认使用小圆点
                parseHTML: element => element.style.listStyleType || 'disc',
                renderHTML: attributes => {
                    return {
                        style: `list-style-type: ${attributes.type}`
                    }
                }
            }
        }
    }
})
