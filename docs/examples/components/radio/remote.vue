<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
const url = ref('http://localhost:8080/remote/method/data')

/**
 * 对结果进行处理，当接口返回不为undefined时，使用接口返回数据作为渲染数据
 * @param result 接口返回数据
 */
const handleSuccess = (result: any) => {
    console.log(result)
    return result
}

/**
 * 构建接口请求参数，注意：返回的是一个json字符串
 * 如果没有参数需求，可以不定义
 */
const buildRequstParam = () => {
    return {
        key: 1
    }
}

setTimeout(() => {
    /**
     * 请求地址发生变化后，会重新加载数据
     * 因此，如果数据是参数敏感的，推荐使用url拼接方式
     */
    url.value = url.value + '?t=2'
}, 3000)
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-radio v-model="value" :url="url" :on-load-success="handleSuccess" :on-before-load="buildRequstParam"></f-radio>
    </div>
</template>