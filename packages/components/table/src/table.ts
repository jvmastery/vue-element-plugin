import { baseRequestInfo } from "@/components/request"
import { AnyObject } from "@/types"
import { ButtonProps, TableColumnCtx } from "element-plus"
import { ExtractPropTypes, PropType } from "vue"

/**
 * 按钮点击事件传输的参数
 */
export interface OptionData {
    /**
     * 当前行数据
     */
    row?: AnyObject
    /**
     * 列信息
     */
    column?: AnyObject
    /**
     * 当前行号
     */
    $index?: Number
    /**
     * 按钮信息
     */
    options: ButtonOption
    /**
     * 选中行数据
     */
    selections: AnyObject[]
}

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
     * 是否显示列
     * 有些可能只是作为查询条件存在，没有实际意义
     */
    show: {
        type: Boolean,
        default: true
    },
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
 * 操作按钮
 */
export interface ButtonOption extends ButtonProps {
    /**
     * 按钮中的文字
     */
    name?: string
    /**
     * 是否需要确认
     */
    confirm?: boolean | number,
    /**
     * 点击事件
     */
    click?: Function
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
    },
    /**
     * 操作栏名称
     */
    optionsColumnName: {
        type: String,
        default: '操作'
    },
    /**
     * 操作栏宽度
     */
    optionsColumnWidth: {
        type: String,
        default: '130px'
    },
    /**
     * 操作按钮
     */
    optionsButtons: {
        type: Array as PropType<ButtonOption[]>
    },
    /**
     * 工具类按钮
     */
    toolButtons: {
        type: Array as PropType<ButtonOption[]>
    }
}

/**
 * props 类型
 */
export type MyTableProps = ExtractPropTypes<typeof tableProps>