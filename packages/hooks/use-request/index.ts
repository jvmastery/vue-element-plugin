import { AnyObject } from '@/types'
import { useGlobalConfig } from '../use-global-config'
import { Method } from '@/constants'

/**
 * 请求配置
 */
export interface RequestOptions {
    /**
     * 是否自动请求
     * 比如：列表页数据直接请求即可，而表单填写数据，则主要是手动触发
     */
    autoRequest?: boolean
    /**
     * 请求参数
     */
    params?: AnyObject
    /**
     * 请求方法
     */
    method?: Method
    /**
     * 请求头信息
     */
    headers?: AnyObject
    /**
     * 文件上传过程
     * @param args  回调参数
     * @returns
     */
    onUploadProgress?: (...args: any[]) => any
}

/**
 * 发送请求
 * @param url 请求地址
 * @param options 请求配置参数
 * @param onBeforeLoad 加载前对参数进行处理
 * @param onLoadSuccess 加载完成后对结果进行处理
 */
export const useRequest = (
    url: string,
    options: RequestOptions = {},
    onBeforeLoad?: Function | undefined,
    onLoadSuccess?: Function | undefined
): Promise<any> => {
    const { params = {}, method = 'GET' } = options
    const request = useGlobalConfig('request')

    if (request.value == undefined) {
        console.error('未配置请求库')
        return Promise.reject('未配置请求库')
    }

    // 发送请求数据
    const requestConfig: AnyObject = {
        ...options,
        url: url,
        method: method
    }

    if (method == 'GET') {
        requestConfig.params = onBeforeLoad ? onBeforeLoad(params) : params
    } else {
        requestConfig.data = onBeforeLoad ? onBeforeLoad(params) : params
    }

    return request.value.request(requestConfig).then(resp => {
        return onLoadSuccess ? onLoadSuccess(resp) : resp
    })
}
