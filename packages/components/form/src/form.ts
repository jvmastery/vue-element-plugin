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
    options?: Array
    // 表单项的验证规则
    rules?: Array
    // 条件表达式，判断表单项是否隐藏
    vif?: Function
    // 其他字段
    [key: string]: any
}