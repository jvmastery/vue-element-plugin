/**
 * 文件上传配置
 */
export interface UploadOptions {
    /**
     * 指定上传字段名称
     */
    fieldName?: string
    /**
     * 是否强制分段上传
     */
    forceMultipart?: boolean
    /**
     * 传输过程回调
     */
    onProgress?: (progress: UploadProgress) => any
    /**
     * 失败回调
     */
    onError?: (...args: any[]) => any
    /**
     * 成功回调
     */
    onSuccess?: (result: UploadResult) => any
}

/**
 * 文件上传过程
 */
export interface UploadProgress {
    /** 上传的文件总大小；单位 byte */
    size: number
    /** 目前处理的百分比进度；范围 0-1 */
    percent: number
}

/**
 * 文件上传结果
 */
export interface UploadResult {
    /**
     * 文件名称
     */
    name: string
    /**
     * 文件大小
     */
    size: number
    /**
     * 相对路径
     */
    path: string
    /**
     * 绝对路径
     */
    url: string
}

/**
 * 上传token返回类型
 */
export interface UploadTokenResponse {
    /**
     * 构建的token
     */
    token: string
    /**
     * 有效期，单位：秒
     */
    expire: number
    /**
     * 地址域名
     */
    host: string
}