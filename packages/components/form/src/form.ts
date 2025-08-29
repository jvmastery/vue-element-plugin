import { AnyObject } from '@/types'
import { defineAsyncComponent, PropType } from 'vue'
import {
    ElAutocomplete,
    ElCalendar,
    ElCascader,
    ElColorPicker,
    ElDatePicker,
    ElInput,
    ElInputNumber,
    ElInputTag,
    ElMention,
    ElRate,
    ElSelectV2,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer,
    ElUpload
} from 'element-plus'
import { iconPropType } from '@/utils'
import { baseRequestInfo } from '@/components/request'
import { Method } from '@/constants'

/**
 * form属性字段类型
 */
export type FieldValueType =
    | 'string' // 字符串
    | 'number' // 数字
    | 'boolean' // 布尔
    | 'array' // 数组
    | 'date' // 日期对象
    | 'datetime' // 日期时间对象
    | 'time' // 时间对象（小时/分钟/秒）
    | 'email' // 邮箱
    | 'url' // URL
    | 'color' // 颜色值（如 #ffffff）
    | 'object' // 对象
    | 'json' // JSON 字符串
    | 'file' // 文件
    | 'any' // 任意类型

/**
 * 表单项
 */
export interface FormField<T extends FieldValueType = FieldValueType> {
    /**
     * 对应字段名称
     */
    name: string
    /**
     * 对应的显示名
     */
    label: string
    /**
     * 属性值类型
     */
    dataType?: T
    /**
     * 标签宽度
     */
    labelWidth?: string | number
    /**
     * 是否必填
     */
    required?: boolean
    /**
     * 占据的列数
     */
    colspan?: number
    /**
     * 表单项类型
     */
    type?: string
    /**
     * 指定一些原生配置项
     */
    attr?: AnyObject
    /**
     * 指定配置项属性
     */
    options?: Array<any>
    /**
     * 表单项的验证规则
     */
    rules?: Array<any>
    /**
     * 条件表达式，判断表单项是否隐藏
     */
    vif?: Function
    /**
     * 其他字段
     */
    [key: string]: any
}

/**
 * 定义组件映射数据
 */
export interface ComponentTypeInfo {
    /**
     * 对应的组件化类型
     */
    comp: ReturnType<typeof defineAsyncComponent>
    /**
     * 自定义配置属性
     */
    options: AnyObject
}

/**
 * 组件名称映射
 * 懒加载element组件
 */
const typeMapping: Record<string, ReturnType<typeof defineAsyncComponent> | ComponentTypeInfo> = {
    // 'autocomplete': defineAsyncComponent(() => import('element-plus/es/components/autocomplete')),
    // 'cascader': defineAsyncComponent(() => import('element-plus/es/components/cascader')),
    // 'color': defineAsyncComponent(() => import('element-plus/es/components/color-picker')),
    // 'date': defineAsyncComponent(() => import('element-plus/es/components/date-picker')),
    // 'input': defineAsyncComponent(() => import('element-plus/es/components/input')),
    // 'input-number': defineAsyncComponent(() => import('element-plus/es/components/input-number')),
    // 'input-tag': defineAsyncComponent(() => import('element-plus/es/components/input-tag')),
    // 'mention': defineAsyncComponent(() => import('element-plus/es/components/mention')),
    // 'rate': defineAsyncComponent(() => import('element-plus/es/components/rate')),
    // 'select2': defineAsyncComponent(() => import('element-plus/es/components/select-v2')),
    // 'slider': defineAsyncComponent(() => import('element-plus/es/components/slider')),
    // 'switch': defineAsyncComponent(() => import('element-plus/es/components/switch')),
    // 'time-picker': defineAsyncComponent(() => import('element-plus/es/components/time-picker')),
    // 'time-select': defineAsyncComponent(() => import('element-plus/es/components/time-select')),
    // 'transfer': defineAsyncComponent(() => import('element-plus/es/components/transfer')),
    // 'upload': defineAsyncComponent(() => import('element-plus/es/components/upload')),
    autocomplete1: ElAutocomplete,
    cascader: {
        comp: defineAsyncComponent(() => import('@/components/cascader')),
        options: {
            clearable: true,
            filterable: true,
            emitPath: false,
            checkStrictly: true
        }
    },
    calendar: ElCalendar,
    color: ElColorPicker,
    date: {
        comp: ElDatePicker,
        options: {
            valueFormat: 'YYYY-MM-DD'
        }
    },
    daterange: {
        comp: ElDatePicker,
        options: {
            type: 'daterange',
            valueFormat: 'YYYY-MM-DD'
        }
    },
    input: ElInput,
    textarea: {
        comp: ElInput,
        options: {
            type: 'textarea',
            autosize: {
                minRows: 5
            }
        }
    },
    'input-number': ElInputNumber,
    'input-tag': ElInputTag,
    mention: ElMention,
    rate: ElRate,
    select2: ElSelectV2,
    slider: ElSlider,
    switch: ElSwitch,
    'time-picker': ElTimePicker,
    'time-select': ElTimeSelect,
    transfer: ElTransfer,
    upload: ElUpload,

    empty: defineAsyncComponent(() => import('./empty.vue')),
    radio: defineAsyncComponent(() => import('@/components/radio')),
    checkbox: defineAsyncComponent(() => import('@/components/checkbox')),
    select: defineAsyncComponent(() => import('@/components/select')),
    editor: defineAsyncComponent(() => import('@/components/editor'))
}

/**
 * 加载组件
 * @param type 组件类型
 * @returns
 */
export const loadComponent = (type: string = 'input') => {
    const comp = typeMapping[type]
    return comp ?? typeMapping.input
}

export const formProps = {
    ...baseRequestInfo,
    method: {
        type: String as PropType<Method>,
        default: 'POST'
    },
    /**
     * 默认每行占据field数量
     */
    colSize: {
        type: Number,
        default: 2
    },
    /**
     * 是否在一行内放置表单
     */
    inline: {
        type: Boolean,
        default: false
    },
    /**
     * 表单项
     */
    fields: {
        type: Array<FormField>
    },
    /**
     * label展示方式
     */
    labelPostion: {
        type: String as PropType<'left' | 'right' | 'top'>,
        default: 'left'
    },
    /**
     * label宽度
     */
    labelWidth: {
        type: String,
        default: 'auto'
    },
    /**
     * 是否显示取消按钮
     */
    showCancelButton: {
        type: Boolean,
        default: false
    },
    /**
     * 取消按钮的文本内容
     */
    cancelButtonText: {
        type: String,
        default: '取消'
    },
    /**
     * 取消按钮的类型
     */
    cancelButtonType: {
        type: String,
        default: 'info'
    },
    /**
     * 取消按钮的图标
     */
    cancelButtonIcon: {
        type: iconPropType
    },
    /**
     * 取消响应事件
     */
    onCancel: {
        type: Function
    },
    /**
     * 是否显示重置按钮
     */
    showResetButton: {
        type: Boolean,
        default: true
    },
    /**
     * 重置按钮的文本内容
     */
    resetButtonText: {
        type: String,
        default: '重置'
    },
    /**
     * 重置按钮的类型
     */
    resetButtonType: {
        type: String
    },
    /**
     * 重置按钮的图标
     */
    resetButtonIcon: {
        type: iconPropType
    },
    /**
     * 重置响应事件
     */
    onReset: {
        type: Function
    },
    /**
     * 是否显示确定按钮
     */
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    /**
     * 确定按钮的文本内容
     */
    confirmButtonText: {
        type: String,
        default: '确定'
    },
    /**
     * 确定按钮的类型
     */
    confirmButtonType: {
        type: String,
        default: 'primary'
    },
    /**
     * 确定按钮的图标
     */
    confirmButtonIcon: {
        type: iconPropType
    },
    /**
     * 点击确认按钮事件
     */
    onConfirm: {
        type: Function
    },
    /**
     * 表单校验规则
     */
    rules: {} as any
}

/**
 * 定义fields
 * @param fields 字段
 * @returns
 */
export function defineFields<const T extends readonly FormField[]>(fields: T) {
    return fields
}

/**
 * valueType 到 TS 类型的映射
 */
type ValueTypeMap = {
    string: string
    number: number
    boolean: boolean
    array: any[]
    date: Date
    datetime: Date
    time: string // 可用字符串或 Date，根据需要
    email: string
    url: string
    color: string
    object: Record<string, any>
    json: string
    file: File
    any: any
}

/**
 *  根据 fields 自动生成 formData 类型
 *  type FormDataType = FormData<typeof fields>
 */
export type FormData<F extends readonly FormField[]> = {
    [K in F[number] as K['name']]?: K extends { valueType: infer T }
        ? T extends keyof ValueTypeMap
            ? ValueTypeMap[T]
            : any
        : any
}
