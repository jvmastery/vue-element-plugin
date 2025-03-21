// 七牛云 oss
import {
    createDirectUploadTask,
    createMultipartUploadV2Task,
    FileData,
    UploadConfig,
    UploadTask,
    Progress
} from 'qiniu-js'
import { ref } from 'vue'
import crypto from 'node:crypto'
import { useGlobalConfig, useRequest } from '@/hooks'
import { ElMessage } from 'element-plus'
import { UploadOptions, UploadConfig as CustomerUploadConfig } from '@/types'

export enum Status {
    Ready,
    Processing,
    Finished
}

function base64UrlSafeEncode(target: string): string {
    return target.replace(/\//g, '_').replace(/\+/g, '-')
}

let tokenExpireTime = 0
let lastToken: string = ''
let host: string = ''

/**
 * 获取uploadToken
 * @returns
 */
export const getUploadToken = (accessKey: string, secretKey: string, bucket: string, configHost: string | undefined) => {
    const deadline = Math.floor(Date.now() / 1e3) + 360
    const hmacEncoder = crypto.createHmac('sha1', secretKey)
    const putPolicy = JSON.stringify({ scope: bucket, deadline })
    const encodedPutPolicy = base64UrlSafeEncode(btoa(putPolicy))

    const sign = base64UrlSafeEncode(hmacEncoder.update(encodedPutPolicy).digest('base64'))
    const token = `${accessKey}:${sign}:${encodedPutPolicy}`

    // 设置缓存值
    lastToken = token
    tokenExpireTime = deadline*1000
    host = configHost ?? ''

    return token
}

/**
 * 从服务端构建token
 */
const buildTokenFromServer = async (uploadOptions: CustomerUploadConfig) => {
    const now = Date.now()
    const result = await useRequest(uploadOptions.tokenProviderUrl!, {
        method: 'POST'
    })

    // 格式化处理
    const formatterResult = uploadOptions.tokenFormtter ? uploadOptions.tokenFormtter(result) : result
    lastToken = formatterResult.token
    tokenExpireTime = now + formatterResult.expire*1000
    host = formatterResult.host

    return formatterResult.token
}

/**
 * 文件上传
 *
 * @param file 待上传文件
 * @param forceDirect 是否是直接上传，如果为false，则使用断点上传
 */
export const qiniuUpload = (file: File, options: UploadOptions = {
    forceMultipart: false
}) => {
    const uploadOptions = useGlobalConfig('uploadConfig')
    const status = ref(Status.Ready)
    const uploadTask = ref<UploadTask>()
    const process = ref<Partial<Progress>>()
    const error = ref()

    const start = () => {
        if (uploadOptions.value == undefined) {
            return Promise.reject('未配置UploadConfig');
        }
        
        const uploadConfig: UploadConfig = {
            // 用于获取上传所需 token 的函数
            tokenProvider: async () => {
                try {
                    if (lastToken != '' && tokenExpireTime > Date.now()) {
                        return lastToken
                    }

                    if (uploadOptions.value?.tokenProviderUrl) {
                        // 从服务端获取
                        return await buildTokenFromServer(uploadOptions.value)
                    } else if (uploadOptions.value?.accessKey && uploadOptions.value?.secretKey && uploadOptions.value?.bucket) {
                        return getUploadToken(uploadOptions.value.accessKey, uploadOptions.value.secretKey, uploadOptions.value.bucket, uploadOptions.value.host)
                    } else {
                        ElMessage.error('文件上传失败：未配置token获取方式')
                        if (options.onError) {
                            options.onError('未配置token获取方式')
                        }
                        return Promise.reject('未配置token获取方式')
                    }
                } catch (error) {
                    if (options.onError) {
                        options.onError(error)
                    }
                }
            }
        }

        const now = new Date()
        const fileUploadPath = `${uploadOptions.value.rootPath ? uploadOptions.value.rootPath + '/' : ''}${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}/${file.name}`
        const fileData: FileData = {
            type: 'file',
            key: fileUploadPath,
            data: file
        }

        // 判断是否需要分开上传
        const useBlockedUpload =
            uploadOptions.value.blockedUploadSize &&
            uploadOptions.value.blockedUploadSize > file.size
        const newUploadTask = options.forceMultipart || useBlockedUpload
            ? createMultipartUploadV2Task(fileData, uploadConfig)
            : createDirectUploadTask(fileData, uploadConfig)

        // 设置进度回调函数
        newUploadTask.onProgress(progress => {
            status.value = Status.Processing
            process.value = { ...progress } as any
            if (options.onProgress) {
                options.onProgress({
                    size: process.value?.size ?? file.size,
                    percent: process.value?.percent ?? 0
                })
            }
        })

        newUploadTask.onError(errorInfo => {
            status.value = Status.Finished
            error.value = errorInfo
            ElMessage.error('文件上传失败：' + errorInfo?.message)
            if (options.onError) {
                options.onError(errorInfo)
            }
        })

        newUploadTask.onComplete(result => {
            status.value = Status.Finished
            const resultJson = result ? JSON.parse(result) : {}
            let path = resultJson.key ?? fileUploadPath

            if (options.onSuccess) {
                options.onSuccess({
                    name: file.name,
                    size: file.size,
                    path: path,
                    url: host + "/" + path
                })
            } 
        })

        uploadTask.value = newUploadTask
        newUploadTask.start()
    }

    start()
}
