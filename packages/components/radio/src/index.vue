<script lang="ts" setup>
import { computed, PropType, ref, watchEffect } from 'vue'
import { getRequest } from '../../../axiosInstance'

const props = defineProps({
    /**
     * 样式类型，是复选框还是按钮
     */
    type: {
        type: String as PropType<'check' | 'button'>,
        validator: (value: string) => ['check', 'button'].includes(value),
        default: 'check'
    },
    /**
     * 数据请求方式
     */
     url: String,
    /**
     * 数据请求方法
     */
    method: {
        type: String,
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
    onBeforeLoad: Function,
    /**
     * 显示项
     */
     options: {
        type: Array as PropType<AnyObject[]>
    },
    /**
     * 是否显示边框
     */
    border: {
        type: Boolean,
        default: false
    },
    /**
     * 选项值的属性
     */
    value: {
        type: String,
        default: 'value'
    },
    /**
     * 选项配置
     */
    label: {
        type: String,
        default: 'label'
    }
})

/**
 * 远程请求数据
 */
 const remoteRequestData = ref<AnyObject[]>([])

/**
 * 监听数据请求url，请求数据
 */
watchEffect(() => {
    getRequest(props.url, props.method, props.onBeforeLoad, props.onLoadSuccess).then(resp => {
        remoteRequestData.value.splice(0, remoteRequestData.value.length, ...resp)
    })
})

// 数据列表
const radioOptions = computed(() => {
    if (props.options) {
        // 优先指定数据
        return props.options
    }

    if (remoteRequestData.value.length > 0) {
        return remoteRequestData.value
    }

    return []
})

// 确认复选框样式
const styleType = computed(() => {
    return props.type == 'check' ? 'el-radio' : 'el-radio-button'
})

</script>

<template>
    <el-radio-group v-bind="$attrs">
        <slot>
            <component 
                v-for="(item, index) in radioOptions" 
                v-bind="item" 
                :is="styleType" 
                :key="index" 
                :value="item[value]" 
                :disabled="item.disabled"
                :border="border"
            >
                <slot :name="item[value]" v-bind="item">
                    {{ item[label] }}
                </slot>
            </component>
        </slot>
  </el-radio-group>
</template>