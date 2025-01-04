/**
 * axios实例配置
 */
import type { AxiosInstance } from 'axios'
let axiosInstance: AxiosInstance | null = null

/**
 * 设置axios实例
 * @param instance axios实例
 */
export const setAxios = (instance: AxiosInstance) => {
    axiosInstance = instance
}

/**
 * 获取axios实例
 */
export const getAxios = (): AxiosInstance => {
    if (!axiosInstance) {
        throw new Error('axios实例没有配置，请先通过setAxios()方法进行配置')
    }

    return axiosInstance
}