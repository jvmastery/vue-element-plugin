import { baseRequestInfo } from '@/components/request'
import { AnyObject } from '@/types'
import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 基础类型，和radio相同的配置
 */
export const checkboxBaseProps = {
    ...baseRequestInfo,
    /**
     * 样式类型，是复选框还是按钮
     */
    type: {
        type: String as PropType<'check' | 'button'>,
        validator: (value: string) => ['check', 'button'].includes(value),
        default: 'check'
    },
    /**
     * 显示项
     */
    options: {
        type: Array as PropType<AnyObject[]>
    },
    /**
     * 是否显示边框
     */
    border: {
        type: Boolean,
        default: false
    },
    /**
     * 选项值的属性
     */
    value: {
        type: String,
        default: 'value'
    },
    /**
     * 选项配置
     */
    label: {
        type: String,
        default: 'label'
    }
}

/**
 * 定义checkbox需要的数据
 */
export const checkboxProps = {
    ...checkboxBaseProps
}

/**
 * checkbox props 类型
 */
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>