import { definePropType } from '@/utils'
import { ExtractPropTypes } from 'vue'

/**
 * 对话框属性
 */
export const dialogProps = {
    /**
     * Dialog 自身是否插入至 body 元素上
     */
    appendToBody: {
        type: Boolean,
        default: true
    },
    /**
     * Dialog 挂载到哪个 DOM 元素 将覆盖 append-to-body
     */
    appendTo: {
        type: definePropType<string | HTMLElement>([String, Object]),
        default: 'body'
    },
    /**
     * 是否全屏展示
     */
    isFull: Boolean,
    /**
     * 点击外部关闭弹窗
     */
    closeOnClickModal: Boolean,
    /**
     * 是否可拖动
     */
    draggable: {
        type: Boolean,
        default: true
    }
}

/**
 * props 类型
 */
export type DialogProps = ExtractPropTypes<typeof dialogProps>
