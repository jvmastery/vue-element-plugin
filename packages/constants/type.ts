/**
 * 类型定义
 */

import { AxiosInstance } from "axios"

/**
 * 上传配置
 */
export interface UploadConfig {
    /**
     * 指定文件上传地址前缀
     */
    rootPath?: string
    /**
     * 分块上传文件大小，如果配置了，当文件大小超过该大小时，使用分开上传
     * 最小 4M 
     */
    blockedUploadSize?: number
    /**
     * 设置服务端token的提供url地址
     */
    tokenProviderUrl?: string
    /**
     * 获取授权的accessKey。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    accessKey?: string
    /**
     * 获取授权的secretKey。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    secretKey?: string
    /**
     * 文件存储对应的bucket。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    bucket?: string
}


/**
 * 插件配置属性
 */
export interface PluginContext {
    // 请求库
    request?: AxiosInstance
    // 请求拦截器
    requestInterceptors?: ((config: any) => any)[]
    // 响应拦截器
    responseInterceptors?: ((response: any) => any)[]

    // 请求配置信息
    uploadConfig?: UploadConfig
}