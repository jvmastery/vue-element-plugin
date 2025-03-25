import { AnyObject } from "@/types"
import { defineAsyncComponent } from "vue"
import { ElAutocomplete, ElCalendar, ElColorPicker, ElDatePicker, ElInput, ElInputNumber, ElInputTag, ElMention, ElRate, ElSelectV2, ElSlider, ElSwitch, ElTimePicker, ElTimeSelect, ElTransfer, ElUpload } from 'element-plus'

/**
 * 表单项
 */
export interface FormField {
    // 对应字段名称
    name: string
    // 对应的显示名
    label: string
    // 标签宽度
    labelWidth?: string | number
    // 占据的列数
    colspan?: number
    // 表单项类型
    type?: string
    // 指定一些原生配置项
    attr?: AnyObject
    // 指定配置项属性
    options?: Array<any>
    // 表单项的验证规则
    rules?: Array<any>
    // 条件表达式，判断表单项是否隐藏
    vif?: Function
    // 其他字段
    [key: string]: any
}


/**
 * 组件名称映射
 * 懒加载element组件
 */
const typeMapping: Record<string, ReturnType<typeof defineAsyncComponent>> = {
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
    'autocomplete1': ElAutocomplete,
    'cascader': ElCalendar,
    'color': ElColorPicker,
    'date': ElDatePicker,
    'input': ElInput,
    'input-number': ElInputNumber,
    'input-tag': ElInputTag,
    'mention': ElMention,
    'rate': ElRate,
    'select2': ElSelectV2,
    'slider': ElSlider,
    'switch': ElSwitch,
    'time-picker': ElTimePicker,
    'time-select': ElTimeSelect,
    'transfer': ElTransfer,
    'upload': ElUpload,

    'radio': defineAsyncComponent(() => import('@/components/radio')),
    'checkbox': defineAsyncComponent(() => import('@/components/checkbox')),
    'select': defineAsyncComponent(() => import('@/components/select')),
    'editor': defineAsyncComponent(() => import('@/components/editor'))
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