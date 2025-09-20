/**
 * 判断是否是undeifned
 * @param val 待判断的数据
 * @returns
 */
export const isUndefined = (val: any): val is undefined => val === undefined

/**
 * 判断是否是boolean
 * @param val 待判断的数据
 * @returns
 */
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/**
 * 判断传入的值是否为number类型
 * @param {any} val - 需要判断的值
 * @returns {val is number} - 返回一个布尔值，表示传入的值是否为number类型
 */
export const isNumber = (val: any): val is number => typeof val === 'number'

/**
 * 判断传入的值是否为字符串类型
 * @param {any} val - 需要判断的值
 * @returns {val is string} 如果值是字符串类型，则返回true，否则返回false
 */
export const isString = (val: any): val is string => typeof val === 'string'

/**
 * 判断给定的值是否为Symbol类型的函数
 * @param {any} val - 需要判断的值
 * @returns {val is symbol} 如果val是Symbol类型，返回true；否则返回false
 */
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'

/**
 * 判断传入的值是否为数组类型
 * @param {any} val - 需要判断的值
 * @returns {val is Array<any>} 如果值是数组类型，则返回true；否则返回false
 */
export const isArray = Array.isArray

/**
 * 判断传入的值是否为对象且不为数组
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是对象且不是数组，返回true；否则返回false
 */
export const isObject = (val: any): val is Record<string, any> =>
    val !== null && typeof val === 'object' && !isArray(val)
/**
 * 判断传入的值是否为函数。
 * @param val - 需要判断的值。
 * @returns {boolean} 如果值是函数，则返回true，否则返回false。
 */
export const isFunction = (val: any): val is Function => typeof val === 'function'

/**
 * 判断传入的值是否为字符串形式的数字
 * @param {string} val - 要判断的值
 * @returns {boolean} 返回值是否为字符串形式的数字
 */
export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
        return false
    }
    return !Number.isNaN(Number(val))
}

/**
 * 判断传入的值是否为JSON字符串
 * @param {string} val - 要判断的值
 * @returns {boolean} 如果值是JSON字符串，则返回true；否则返回false
 */
export const isJsonString = (val: string): boolean => {
    try {
        JSON.parse(val)
        return true
    } catch (error) {
        return false
    }
}

/**
 * 判断一个值是否为空
 * @param val 要判断的值
 * @returns 如果为空返回true，否则返回false
 */
export const isEmpty = (val: unknown) =>
    (!val && val !== 0) ||
    (isArray(val) && val.length === 0) ||
    (isObject(val) && !Object.keys(val).length)
