<script setup lang="ts">
import { useTimeout } from '@f-ui/hooks/use-timeout';
import { ref, watch } from 'vue'

const value = ref()

const { start, clear, timeoutHandle } = useTimeout()
start(() => {
    value.value = 100
}, 3000)

</script>
<template>
    <div>
        <div>等待3秒后显示数据：{{ value }}</div>
    </div>
</template>