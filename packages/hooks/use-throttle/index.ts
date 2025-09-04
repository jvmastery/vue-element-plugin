/**
 * 节流函数
 * 确保在设定的时间间隔内只执行一次函数调用。无论函数被调用了多少次，都会在固定时间内只触发一次，这样可以限制函数的执行频率。
 */
import { useTimeout } from "../use-timeout"

/**
 * 节流函数
 * @param func 函数
 * @param interval 间隔时间
 * @param options leading：是否在延迟开始前调用函数   trailing：是否在延迟开始后调用函数
 * @returns 
 */
export const useThrottle = (func: (...args: any[]) => any, interval: number = 500, options = {
    leading: true,
    trailing: true
}) => {
    // 上次执行时间，如果options.leading 为 false，第一次调用不会立即执行
    let previousTime = options.leading ? 0 : Date.now()
    const { start, clear, timeoutHandle } = useTimeout()
    
    return (...args: any[]) => {
        const now = Date.now()

        // 剩余时间
        const remaining = interval - (now - previousTime)
        if (remaining <= 0 || remaining > interval) {
            // 执行
            clear()
            previousTime = now
            func(...args)
        } else if (!timeoutHandle.value && options.trailing) {
            // 如果需要在结束时触发，设置定时器
            start(() => {
                previousTime = options.leading ? Date.now() : 0
                func(...args)
                timeoutHandle.value = null
            }, remaining)
        }
    }
}