/**
 * axios实例配置
 */
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
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

/**
 * 获取远程数据
 * @param url   地址
 * @param method    请求方式
 * @param onBeforeLoad  前置参数处理
 * @param onLoadSuccess     后置回调数据
 * @returns 
 */
export const getRequest = (url: string | undefined, method: string, onBeforeLoad: Function | undefined, onLoadSuccess: Function | undefined) => {
    if (!url) {
        return Promise.reject()
    }

    /**
     * 请求配置
     */
    const requestConfig: AxiosRequestConfig = {
        url: url,
        method: method
    }

    // 设置请求参数
    if (onBeforeLoad) {
        const paramResult = onBeforeLoad()
        if (paramResult) {
            if (method.toUpperCase() == 'GET') {
                requestConfig.params = paramResult
            } else {
                requestConfig.data = paramResult
            }
        }
    }

    /**
     * 请求数据
     */
    return getAxios().request(requestConfig).then(resp => {
        let showResult: any
        if (onLoadSuccess) {
            const result = onLoadSuccess(resp)
            showResult = result ? result : resp            
        } else {
            showResult = resp
        }

        return showResult
    })
}