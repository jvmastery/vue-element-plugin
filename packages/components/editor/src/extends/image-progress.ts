/**
 * 带有进度条的文件上传
 */

import { mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'


declare module '@tiptap/core' {
    export interface Commands<ReturnType> {
        ImageProgress: {
            /**
             * 扩展进度条1
             */
            setImage: (options: {
                src: string
                alt?: string
                title?: string
                dataProgress?: number
                dataLoading?: boolean
            }) => ReturnType
        }
    }
}

export const ImageProgress = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            // 上传进度
            dataProgress: null,
            // 是否处于加载状态
            dataLoading: null
        }
    },

    renderHTML({ HTMLAttributes }) {
        const dataLoading = HTMLAttributes.dataLoading
        const dataProgress = HTMLAttributes.dataProgress

        if ((dataLoading == undefined && dataProgress == undefined) || !dataLoading) {
            // 普通image节点
            return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
        }

        return [
            'div',
            { class: 'image-wrapper', 'data-loading': dataLoading },
            ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
            ['span', { class: 'progress-text' }, `${~~dataProgress}%`]
        ]
    }
})
