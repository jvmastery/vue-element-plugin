import {
    configContextProvideKey,
    PluginContext,
    requestInstanceProvideKey,
    uploadConfigProvideKey
} from '@/constants'
import { keysOf } from '@/utils'
import { App, computed, getCurrentInstance, inject, provide, Ref, ref, unref } from 'vue'

// 使用配置
const globalConfig = ref<PluginContext>()

/**
 * 使用函数重载，为不同参数情况提供重载签名
 * @param key 
 * @param defaultValue 
 */
export function useGlobalConfig<K extends keyof PluginContext, D extends PluginContext[K]>(
    key: K,
    defaultValue?: D
): Ref<Exclude<PluginContext[K], undefined> | D>

export function useGlobalConfig(): Ref<PluginContext>

/**
 * 获取注入的配置属性
 * @param provideKey 注入key
 * @param key        配置中对应的字段
 * @param defaultValue 默认值
 * @returns
 */
export function useGlobalConfig(key?: keyof PluginContext, defaultValue = undefined) {
    const config = getCurrentInstance()
        ? inject(configContextProvideKey, globalConfig)
        : globalConfig

    // 如果指定了key，则只获取对应的key
    return key ? computed(() => config.value?.[key] ?? defaultValue) : config
}

/**
 * 注入配置
 * @param config    配置属性
 * @param app    上下文
 * @param global 是否是全局属性
 * @returns
 */
export const provideGlobalConfig = (config: PluginContext, app?: App, global = false) => {
    const inSetup = !!getCurrentInstance()

    const provideFn = app?.provide ?? (inSetup ? provide : undefined)
    if (!provideFn) {
        // 无法进行注入
        return
    }

    const oldConfig = inSetup ? useGlobalConfig() : undefined
    const context = computed(() => {
        const cfg = unref(config)
        if (!oldConfig?.value) return cfg
        return mergeConfig(oldConfig.value, cfg)
    })

    provideFn(configContextProvideKey, context)
    provideFn(
        requestInstanceProvideKey,
        computed(() => context.value.request)
    )
    provideFn(
        uploadConfigProvideKey,
        computed(() => context.value.uploadConfig)
    )

    if (global) {
        globalConfig.value = context.value
    }
}

/**
 * 合并配置
 * @param a
 * @param b
 * @returns
 */
const mergeConfig = (a: PluginContext, b: PluginContext): PluginContext => {
    const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
    const obj: Record<string, any> = {}
    for (const key of keys) {
        obj[key] = b[key] !== undefined ? b[key] : a[key]
    }
    return obj
}
