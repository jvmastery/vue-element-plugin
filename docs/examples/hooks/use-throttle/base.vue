<script setup lang="ts">
import { useThrottle } from '@f-ui/hooks/use-throttle'
import { ref, watch } from 'vue'

const value = ref()
const debounceValue = ref()

const throttle = useThrottle((newValue) => {
    debounceValue.value = newValue
    console.log('throttle: ' + Date.now())
}, 1000)

watch(value, newValue => {
    throttle(newValue)
})


</script>
<template>
    <div>
        <el-input v-model="value" />
        <div>当前输入框的值：{{ value }}</div>
        <div>节流处理（每1s只会显示一次）：{{ debounceValue }}</div>
    </div>
</template>