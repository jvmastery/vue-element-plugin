import { AnyObject } from "@/types";
import { useGlobalConfig } from "../use-global-config";

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
    params?: AnyObject,
    /**
     * 请求方法
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
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
 */
export const useRequest = (url: string, options: RequestOptions = {}): Promise<any> => {
    const { params = {}, method = 'GET'} = options
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
        requestConfig.params = params
    } else {
        requestConfig.data = params
    }

    return request.value.request(requestConfig)
}

