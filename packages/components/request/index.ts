import { Method } from '@/constants'
import { PropType } from 'vue'

/**
 * 基本请求信息
 */
export const baseRequestInfo = {
    /**
     * 数据请求方式
     */
    url: String,
    /**
     * 数据请求方法
     */
    method: {
        type: String as PropType<Method>,
        default: 'GET'
    },
    /**
     * 请求完成后的回调，对返回数据进行处理
     */
    onLoadSuccess: Function,
    /**
     * 数据请求前的回调，对请求参数进行处理
     * 返回的是一个json字符串，否则会有问题
     */
    onBeforeLoad: Function
}
