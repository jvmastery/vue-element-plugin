import { baseRequestInfo } from "@/components/request"
import { AnyObject } from "@/types"
import { TableColumnCtx } from "element-plus"
import { ExtractPropTypes, PropType } from "vue"

/**
 * 表单项配置
 */
export interface TableColumn extends TableColumnCtx<any> {
    /**
     * 是否是搜索条件，如果为是，则会在搜索条件中增加搜索项
     */
    searchable: boolean
    /**
     * 数据类型，对内容进行结构处理
     */
    type: string
    /**
     * 定义字段分隔符，表名这是一个字符串数组拼接而成
     */
    wordSeperator: string
    /**
     * 搜索框默认值，只有searchable为true时才有效
     */
    searchDefault: any,
    /**
     * 设置表单原生属性
     */
    attrs: AnyObject
    /**
     * 配置属性
     */
    options?: Array<any>
    /**
     * 配置属性中对应label字段
     */
    optionsLabel?: string
    /**
     * 配置属性中对应value字段
     */
    optionsValue?: string
    /**
     * 子栏目，设置多级表头时用
     */
    children: Array<TableColumn>
}

/**
 * 表单基础类型
 */
export const tableProps = {
    ...baseRequestInfo,
    /**
     * 表单第一列的类型
     * 如果设置了selection则显示多选框； 
     * 如果设置了 index 则显示该行的索引（从 1 开始计算）； 
     * 如果设置了 expand 则显示为一个可展开的按钮
     */
    type: String as PropType<'selection' | 'index' | 'expand'>,
    /**
     * 表单项
     */
    columns: {
        type: Array as PropType<TableColumn[]>
    },
    /**
     * 是否带斑马纹
     */
    stripe: {
        type: Boolean,
        default: true
    },
    /**
     * 是否带边框
     */
    border: {
        type: Boolean,
        default: true
    },
    /**
     * 表单数据
     */
    data: {
        type: Array as PropType<AnyObject[]>
    },
    /**
     * 是否显示分页
     */
    showPage: {
        type: Boolean,
        default: true
    },
    /**
     * 数据总数，只有自定义data时才有效
     */
    pageTotal: {
        type: Number
    },
    /**
     * 每页显示个数选择器的选项设置
     */
    pageSizes: {
        type: Array<number>
    },
    /**
     * 分页背景设置
     */
    pageBackgroud: {
        type: Boolean
    },
    /**
     * 分页布局设置
     */
    pageLayout: {
        type: String,
        default: 'sizes, prev, pager, next, jumper'
    }
}

/**
 * props 类型
 */
export type MyTableProps = ExtractPropTypes<typeof tableProps>