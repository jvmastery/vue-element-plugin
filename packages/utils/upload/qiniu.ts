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
import crypto from 'crypto'
import { useGlobalConfig, useRequest } from '@/hooks'
import { ElMessage } from 'element-plus'

export enum Status {
    Ready,
    Processing,
    Finished
}

export interface UploadOptions {
    /**
     * 是否强制分段上传
     */
    forceMultipart?: boolean
    /**
     * 传输过程回调
     */
    onProgress?: (...args: any[]) => any
    /**
     * 失败回调
     */
    onError?: (...args: any[]) => any
    /**
     * 成功回调
     */
    onSuccess?: (...args: any[]) => any
}

function base64UrlSafeEncode(target: string): string {
    return target.replace(/\//g, '_').replace(/\+/g, '-')
}

/**
 * 获取uploadToken
 * @returns
 */
export const getUploadToken = (accessKey: string, secretKey: string, bucket: string) => {
    const deadline = Math.floor(Date.now() / 1e3) + 360
    const hmacEncoder = crypto.createHmac('sha1', secretKey)
    const putPolicy = JSON.stringify({ scope: bucket, deadline })
    const encodedPutPolicy = base64UrlSafeEncode(btoa(putPolicy))

    const sign = base64UrlSafeEncode(hmacEncoder.update(encodedPutPolicy).digest('base64'))
    const token = `${accessKey}:${sign}:${encodedPutPolicy}`
    return token
}

/**
 * 文件上传
 *
 * @param file 待上传文件
 * @param forceDirect 是否是直接上传，如果为false，则使用断点上传
 */
export const upload = (file: File, options: UploadOptions = {
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
                if (uploadOptions.value?.tokenProviderUrl) {
                    // 从服务端获取
                    const result = await useRequest(uploadOptions.value.tokenProviderUrl)
                    return result
                } else if (uploadOptions.value?.accessKey && uploadOptions.value?.secretKey && uploadOptions.value?.bucket) {
                    return getUploadToken(uploadOptions.value.accessKey, uploadOptions.value.secretKey, uploadOptions.value.bucket)
                } else {
                    return Promise.reject('未配置token获取方式')
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
                options.onProgress(progress)
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
            if (options.onSuccess) {
                options.onSuccess(result)
            }
        })

        uploadTask.value = newUploadTask
        newUploadTask.start()
    }

    start()
}
