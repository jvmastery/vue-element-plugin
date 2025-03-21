// 根据系统配置进行文件上传
import { UploadOptions } from "@/types"
import { useGlobalConfig } from "../use-global-config"
import { qiniuUpload, serverUpload } from "@/utils"

export const useUpload = (file: File, options: UploadOptions) => {
    const uploadOptions = useGlobalConfig('uploadConfig')

    switch(uploadOptions.value?.type ?? 'direct') {
        case 'direct':
            // 直接上传
            serverUpload(file, options)
            return
        case 'qiniu':
            // 七牛oss
            qiniuUpload(file, options)
            return    
    }

}