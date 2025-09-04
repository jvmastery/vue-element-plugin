import { isArray, isObject } from '@/utils'
import { ref, Ref, getCurrentInstance, toRaw } from 'vue'

/**
 * 自动封装 v-model，兼容对象 / 数组 / 基础类型
 * 无需 deep watch，依赖 Proxy 实现变更追踪
 * @param defaultValue 默认值（用于类型推断和初始化）
 * @param propName 自定义 v-model 名称，默认 'modelValue'
 * @param formatter 初始化数据时，数据格式化
 */
export function useDefineModel<T>(
    defaultValue: T,
    propName = 'modelValue',
    formatter?: (value: any) => T
): Ref<T> {
    const instance = getCurrentInstance()
    if (!instance) throw new Error('useDefineModel must be used inside setup()')

    const props = instance.proxy?.$props ?? {}
    const emit = instance.proxy?.$emit as ((e: `update:${string}`, value: any) => void) | undefined

    // 1. 父组件传入值 > 默认值
    let initialValue =
        propName in props && props[propName as keyof typeof props] !== undefined
            ? (props[propName as keyof typeof props] as T)
            : defaultValue

    if (formatter) {
        initialValue = formatter(initialValue)
    }

    // 2. 向父组件同步的函数
    const syncParent = (val: any) => {
        if (!emit) return
        // 避免 Proxy 对象污染父组件，始终传原始数据
        const toEmit = isArray(val) ? [...toRaw(val)] : isObject(val) ? { ...toRaw(val) } : val
        emit(`update:${propName}`, toEmit)
    }

    // 3. Proxy 工厂：递归包装对象 / 数组
    const createProxy = (target: any, root: Ref<any>, seen = new WeakMap()): any => {
        if (target === null || typeof target !== 'object') return target
        if (seen.has(target)) return seen.get(target)

        const proxy = new Proxy(target, {
            get(obj, key) {
                const value = obj[key as keyof typeof obj]
                // 嵌套对象 / 数组递归包装
                return typeof value === 'object' && value !== null
                    ? createProxy(value, root, seen)
                    : value
            },
            set(obj, key, value) {
                const old = obj[key as keyof typeof obj]
                if (old !== value) {
                    obj[key as keyof typeof obj] = value
                    // ✅ 始终同步整个根对象（数组），而不是单个子对象
                    syncParent(root.value)
                }
                return true
            },
            deleteProperty(obj, key) {
                if (key in obj) {
                    delete obj[key as keyof typeof obj]
                    // ✅ 删除时也要同步整个根对象
                    syncParent(root.value)
                }
                return true
            }
        })

        seen.set(target, proxy)
        return proxy
    }

    // 4. 初始化本地值（带 Proxy）
    const local = ref(
        typeof initialValue === 'object' && initialValue !== null
            ? createProxy(initialValue, {} as Ref<any>) // root 占位，后面覆盖
            : initialValue
    ) as Ref<T>

    // 修复 root 引用（递归包装时需要）
    if (typeof local.value === 'object' && local.value !== null) {
        local.value = createProxy(initialValue, local) // ✅ 正确 root
    }

    return local
}
