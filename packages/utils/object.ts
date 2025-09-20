// 对象工具类

import { AnyObject } from '@/types'

/**
* 获取对象的键数组
* @template T 任意对象类型
* @param {T} arr 输入的对象
* @returns {Array<keyof T>} 返回对象的键数组
*/
export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>

/**
* 将对象的键值对转换为数组格式
* @param arr 输入的对象
* @returns 返回一个包含对象键值对的二维数组
*/
export const entriesOf = <T extends object>(arr: T) => Object.entries(arr)

/**
 * 提取某个字段作为key，转换成对象
 * @param array     数组
 * @param key       提取的字段
 * @param value     定义对应的value值，没有则默认为对象本身
 */
export const convertArrayToObject = (
    array: AnyObject[] | undefined,
    key: string,
    value?: string
) => {
    if (array == undefined) {
        return {}
    }

    const obj = array.reduce((acc, item) => {
        if (value) {
            if (item[value] != undefined) {
                acc[item[key]] = item[value]
            }
        } else {
            acc[item[key]] = item
        }
        return acc
    }, {})
    return obj
}

