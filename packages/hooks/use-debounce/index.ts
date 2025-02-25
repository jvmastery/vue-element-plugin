/**
 * 防抖函数
 * 在连续调用时，只在最后一次调用结束后延迟一段时间再执行传入函数
 * 使用场景示例：在输入框实时搜索时，当用户连续输入时避免频繁发送请求，只在输入停止一段时间后再发送一次请求
 */
import { ref, watch } from "vue"
import { useTimeout } from "../use-timeout"

interface DebounceOptions {
    // 等待时间，毫秒
    wait: number
    // 是否立即执行
    immediate?: boolean
}

/**
 * 防抖函数
 * @param value     防抖数据 
 * @param options  配置参数
 */
export const useDebounce = (value: (...args: any[]) => any, options: DebounceOptions = {
    wait: 500
}) => {
    const { start, clear, timeoutHandle } = useTimeout()
    return (...args: any[]) => {
        clear()
        if (options.immediate && !timeoutHandle.value) {
            value(...args)
            return
        }

        start(() => {
            value(...args)
        }, options.wait)
    } 
}

/**
 * 防抖函数，直接对简单响应式数据进行监听
 * @param value 对响应式数据进行监听
 * @param options   配置参数
 * @returns 
 */
export const useDataDebounce = (value: any, options?: DebounceOptions) => {
    const debounceValue = ref()
    const debounce = useDebounce((newValue: any) => {
        console.log(222)
        debounceValue.value = newValue
    }, options)

    // 监听数据变化
    watch(value, newValue => {
        debounce(newValue)
    }, {
        deep: true,
        immediate: true
    })

    return debounceValue
}

