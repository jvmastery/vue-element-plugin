import { ExtractPropTypes, PropType } from 'vue'

export const selectProps = {
    /**
     * 数据请求方式
     */
    url: String,
    /**
     * 数据请求方法
     */
    method: {
        type: String,
        default: 'GET'
    },
    /**
     * 请求完成后的回调，对返回数据进行处理
     */
    onLoadSuccess: Function,
    /**
     * 数据请求前的回调，对请求参数进行处理
     * 返回的是一个json字符串，否则会有问题
     */
    onBeforeLoad: Function,
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