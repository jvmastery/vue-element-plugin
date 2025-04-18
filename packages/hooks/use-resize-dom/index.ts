import { onMounted, Ref, watchEffect } from 'vue'

/**
 * 拉伸方向
 */
enum Direct {
    TOP = 'n',
    TOP_LEFT = 'nw',
    TOP_RIGHT = 'ne',
    BOTTOM = 's',
    BOTTOM_LEFT = 'sw',
    BOTTOM_RIGHT = 'se',
    LEFT = 'w',
    right = 'e'
}

/**
 * 默认拉伸div的属性
 */
const resizeDivOptions = {
    /**
     * 拉伸区域大小
     */
    areaSize: '8px',
    /**
     * 区域背景色
     */
    areaBackgroud: 'transparent'
}

/**
 * 计算最大值
 * @param t1
 * @param t2
 * @returns
 */
const useNew = (t1: number, min: number, max: number) => {
    if (isNaN(min)) {
        min = 0
    }

    return t1 >= min && t1 <= max
}

/**
 * 拉伸功能
 */
export const useResizeDom = (targetRef: Ref<HTMLElement | undefined>) => {
    /**
     * 构建拉伸事件
     * @param targetRef
     * @param div
     * @param direct
     */
    const bindResizeEventListener = (
        targetRef: HTMLElement,
        options: any,
        div: HTMLElement,
        direct: Direct,
        transform: any
    ) => {
        const onMouseDown = (e: MouseEvent) => {
            // 鼠标点击位置
            const downClientX = e.clientX
            const downClientY = e.clientY

            targetRef.style.transition = 'none'

            // 组件信息
            const targetRect = targetRef.getBoundingClientRect()
            const minHeight = parseInt(getComputedStyle(targetRef).minHeight)
            const minWidth = parseInt(getComputedStyle(targetRef).minWidth)
            const maxWidth = document.documentElement.clientWidth
            const maxHeight = document.documentElement.clientHeight

            // 需减去拖动属性的tranfer
            const targetLeft = targetRect.left - transform.offsetX
            const targetTop = targetRect.top - transform.offsetY
            const targetWidth = targetRect.width
            const targetHeight = targetRect.height

            /**
             * 正确高度
             * @param newHeight 新的高度
             * @returns
             */
            const isCorrentHeight = (newHeight: number) => {
                return useNew(newHeight, minHeight, 999999)
            }

            /**
             * 判断是否是正确的top
             * @param newTop
             * @returns
             */
            const isCorrentTop = (newTop: number) => {
                return useNew(newTop, -transform.offsetY, maxHeight - minHeight)
            }

            // 计算宽高
            const onMouseMove = (e: MouseEvent) => {
                e.preventDefault()
                switch (direct) {
                    case Direct.TOP:
                        if (
                            isCorrentHeight(targetHeight - (e.clientY - downClientY)) &&
                            isCorrentTop(targetTop + (e.clientY - downClientY))
                        ) {
                            targetRef.style.height = targetHeight - (e.clientY - downClientY) + 'px'
                            targetRef.style.top = targetTop + (e.clientY - downClientY) + 'px'
                        }
                        break
                    case Direct.TOP_LEFT:
                        if (
                            isCorrentHeight(targetHeight - (e.clientY - downClientY)) &&
                            isCorrentTop(targetTop + (e.clientY - downClientY))
                        ) {
                            targetRef.style.height = targetHeight - (e.clientY - downClientY) + 'px'
                            targetRef.style.top = targetTop + (e.clientY - downClientY) + 'px'
                        }
                        targetRef.style.width = targetWidth - (e.clientX - downClientX) + 'px'
                        targetRef.style.left = targetLeft + (e.clientX - downClientX) + 'px'
                        break
                    case Direct.TOP_RIGHT:
                        targetRef.style.height = targetHeight - (e.clientY - downClientY) + 'px'
                        targetRef.style.top = targetTop + (e.clientY - downClientY) + 'px'
                        targetRef.style.width = targetWidth + (e.clientX - downClientX) + 'px'
                        break
                    case Direct.BOTTOM:
                        targetRef.style.height = targetHeight + (e.clientY - downClientY) + 'px'
                        return
                    case Direct.BOTTOM_LEFT:
                        targetRef.style.height = targetHeight + (e.clientY - downClientY) + 'px'
                        targetRef.style.width = targetWidth - (e.clientX - downClientX) + 'px'
                        targetRef.style.left = targetLeft + (e.clientX - downClientX) + 'px'
                        return
                    case Direct.BOTTOM_RIGHT:
                        targetRef.style.height = targetHeight + (e.clientY - downClientY) + 'px'
                        targetRef.style.width = targetWidth + (e.clientX - downClientX) + 'px'
                        break
                    case Direct.LEFT:
                        targetRef.style.width = targetWidth - (e.clientX - downClientX) + 'px'
                        targetRef.style.left = targetLeft + (e.clientX - downClientX) + 'px'
                        break
                    case Direct.right:
                        targetRef.style.width = targetWidth + (e.clientX - downClientX) + 'px'
                        break
                }

                if (options.resizeCallback) {
                    options.resizeCallback()
                }
            }

            document.onmousemove = onMouseMove
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        div.onmousedown = onMouseDown
    }

    /**
     * 创建拉伸div
     * @returns
     */
    const createResizeDiv = (
        targetRef: HTMLElement,
        options: any,
        directs: Direct[],
        transform: any
    ) => {
        console.log(directs)
        directs.forEach(direct => {
            const child = document.createElement('div')
            child.style.position = 'absolute'
            child.style.background = resizeDivOptions.areaBackgroud
            child.style.cursor = direct + '-resize'

            // 定义独立的属性
            let top = `-${resizeDivOptions.areaSize}`
            let left = `-${resizeDivOptions.areaSize}`
            let right = `-${resizeDivOptions.areaSize}`
            let bottom = `-${resizeDivOptions.areaSize}`
            let margin = ''
            let width = resizeDivOptions.areaSize
            let height = resizeDivOptions.areaSize

            // 根据不同的方向进行初始化
            switch (direct) {
                case Direct.TOP:
                    margin = `0 ${resizeDivOptions.areaSize}`
                    width = ''
                    bottom = ''
                    break
                case Direct.TOP_LEFT:
                    right = ''
                    bottom = ''
                    break
                case Direct.TOP_RIGHT:
                    left = ''
                    bottom = ''
                    break
                case Direct.BOTTOM:
                    margin = `0 ${resizeDivOptions.areaSize}`
                    width = ''
                    top = ''
                    break
                case Direct.BOTTOM_LEFT:
                    right = ''
                    top = ''
                    break
                case Direct.BOTTOM_RIGHT:
                    left = ''
                    top = ''
                    break
                case Direct.LEFT:
                    height = ''
                    right = ''
                    margin = `${resizeDivOptions.areaSize} 0`
                    break
                case Direct.right:
                    height = ''
                    left = ''
                    margin = `${resizeDivOptions.areaSize} 0`
                    break
            }

            child.style.top = top
            child.style.left = left
            child.style.right = right
            child.style.bottom = bottom
            child.style.margin = margin
            child.style.height = height
            child.style.width = width
            child.style.userSelect = 'none'

            targetRef.appendChild(child)
            bindResizeEventListener(targetRef, options, child, direct, transform)
        })
    }

    const onResize = () => {
        if (targetRef.value) {
            createResizeDiv(
                targetRef.value,
                {},
                Object.values(Direct),
                {
                    offsetX: 0,
                    offsetY: 0
                }
            )
        }
    }

    onMounted(() => {
        watchEffect(() => {
            onResize()
        })
        
    })
}
