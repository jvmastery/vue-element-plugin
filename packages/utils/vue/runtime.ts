import { PropType } from 'vue'

/**
 * 定义prop类型
 * @param val 
 * @returns 
 */
export const definePropType = <T>(val: any): PropType<T> => val
