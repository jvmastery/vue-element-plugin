import { onMounted, onUnmounted } from "vue"

/**
 * 注册快捷方式
 * @param keyCombination    快捷建
 * @param callback          触发后的行为
 */
export const useShortcut = (keyCombination: string, callback: (event: KeyboardEvent) => void) => {
    const handleKeydown = (event: KeyboardEvent) => {
        const keys = keyCombination.toLowerCase().split('+')
        const isMatch =
            keys.includes(event.key.toLowerCase()) &&
            (keys.includes('ctrl') ? event.ctrlKey : true) &&
            (keys.includes('shift') ? event.shiftKey : true) &&
            (keys.includes('alt') ? event.altKey : true) &&
            (keys.includes('meta') ? event.metaKey : true) // Mac 上 Command 键

        if (isMatch) {
            event.preventDefault() // 阻止默认行为
            callback(event)
        }
    }

    onMounted(() => window.addEventListener('keydown', handleKeydown))
    onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}

export default useShortcut