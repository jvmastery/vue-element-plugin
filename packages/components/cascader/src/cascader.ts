import { baseRequestInfo } from '@/components/request'
import { AnyObject } from '@/types'
import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 配置
 */
export const cascaderProps = {
    ...baseRequestInfo,
    /**
     * 显示项
     */
    options: {
        type: Array as PropType<AnyObject[]>
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
 * props 类型
 */
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>