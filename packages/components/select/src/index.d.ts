/**
 * 选项属性
 */
interface SelectOption {
    value: string | number | boolean | object
    label: string | number
    disabled: boolean
}

/**
 * 选项组属性
 */
interface GroupSelectOption {
    label: string
    options: Array<SelectOption>
}