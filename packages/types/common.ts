/**
 * 对象
 */
export interface AnyObject {
    [key: string]: any;
}

/**
 * 数据验证结果
 */
export interface ValidateResult {
    /**
     * 是否验证成功
     */
    isValid: boolean
    /**
     * 对应的字段
     */
    field?: string
    /**
     * 描述信息
     */
    message?: string
}