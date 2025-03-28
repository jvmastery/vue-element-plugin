import { baseRequestInfo } from '@/components/request'
import { AnyObject } from '@/types'
import { ExtractPropTypes, PropType } from 'vue'

export const selectProps = {
    ...baseRequestInfo,
    /**
     * 显示项
     */
    options: {
        type: Array as PropType<AnyObject[]>
    },
    /**
     * 是否可清空
     */
    clearable: {
        type: Boolean,
        default: true
    },
    /**
     * 使用value值左右选项的class属性
     */
    useValueClass: {
        type: Boolean,
        default: false
    },
    /**
     * 是否有全选功能
     */
    selectAll: {
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
    },
    /**
     * 定义样式
     */
    styleFormatter: Function
}

export type SelectProps = ExtractPropTypes<typeof selectProps>