// 字符串工具类

import { isString } from "./types"

/**
 * 将_换成驼峰格式
 * @param str 字符串
 * @returns
 */
export const toPascalCase = (str: string) => {
    return str
        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) // 转换 _ 后的字母为大写
        .replace(/^[a-z]/, match => match.toUpperCase()) // 将第一个字母转换为大写
}

/**
 * 转换为json对象，如果不是json，则返回原值
 * @param str 
 * @returns 
 */
export function toJson(str: any, defaultValue?: any) {
    if (isString(str)) {
        try {
            return JSON.parse(str)
        } catch (error) {
            console.log('JSON解析失败')
            return defaultValue ?? str
        }
    }

    return str
}