<script setup lang="ts">
import { useDebounce, useDataDebounce } from '@f-ui/hooks/use-debounce'
import { ref, watchEffect } from 'vue'

const value = ref()
const debounceValue = ref()

const debounce = useDebounce(() => {
    debounceValue.value = value.value
})

watchEffect(() => {
    console.log(value.value)
    debounce()
})

// 直接监听
const debounceValue1 = useDataDebounce(value, {
    wait: 1000
})

</script>
<template>
    <div>
        <el-input v-model="value" />
        <div>当前输入框的值：{{ value }}</div>
        <div>防抖处理（输入后500ms才会显示）：{{ debounceValue }}</div>
        <div>防抖处理，直接监听数据（输入后1s才会显示）：{{ debounceValue1 }}</div>
    </div>
</template>