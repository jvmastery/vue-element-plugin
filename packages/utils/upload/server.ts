import { useGlobalConfig, useRequest } from '@/hooks'
import { UploadOptions } from '@/types'
import { ElMessage } from 'element-plus'

/**
 * 通过接口传到服务端
 * @param file
 * @param options
 * @returns
 */
export const serverUpload = async (file: File, options: UploadOptions) => {
    const uploadConfig = useGlobalConfig('uploadConfig')
    if (uploadConfig.value == undefined || !uploadConfig.value.url) {
        return Promise.reject('未配置UploadConfig')
    }

    const formData = new FormData()
    formData.append(options.fieldName ?? 'upload', file)

    useRequest(uploadConfig.value.url, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        params: formData,
        onUploadProgress: progress => {
            if (options.onProgress) {
                options.onProgress({
                    size: progress.total ?? file.size,
                    percent: Math.round((progress.loaded * 100) / progress.total)
                })
            }
        }
    })
        .then(resp => {
            if (options.onSuccess) {
                options.onSuccess({
                    name: file.name,
                    size: file.size,
                    path: resp.path ?? '',
                    url: resp.url ?? ''
                })
            }
        })
        .catch(error => {
            ElMessage.error('文件上传失败：' + error)
            if (options.onError) {
                options.onError(error)
            }
        })
}
