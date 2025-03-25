/**
 * 定义全局注入的key
 */
import { PluginContext, UploadConfig } from "@/types"
import { AxiosInstance } from "axios"
import { InjectionKey, Ref } from "vue"

/**
 * 请求注入key
 */
export const requestInstanceProvideKey: InjectionKey<Ref<AxiosInstance | undefined>> = Symbol()

/**
 * 插件配置文件
 */
export const configContextProvideKey: InjectionKey<Ref<PluginContext>> = Symbol()

/**
 * 上传配置
 */
export const uploadConfigProvideKey: InjectionKey<Ref<UploadConfig | undefined>> = Symbol()