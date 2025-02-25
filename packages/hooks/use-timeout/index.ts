/**
 * 定时器封装
 */
import { tryOnScopeDispose } from '@vueuse/core'
import { ref } from 'vue'

export const useTimeout = () => {
  const timeoutHandle = ref<number | null>()

  /**
   * 启动定时器
   * @param fn 函数
   * @param delay 延迟时间
   */
  const start = (fn: (...args: any[]) => any, delay: number) => {
    clear()
    timeoutHandle.value = window.setTimeout(fn, delay)
  }

  /**
   * 结束定期时
   * @returns 
   */
  const clear = () => {
    if (!timeoutHandle.value) {
      return
    }

    window.clearTimeout(timeoutHandle.value)
  }

  tryOnScopeDispose(() => clear())

  return {
    start,
    clear,
    timeoutHandle
  }
}
