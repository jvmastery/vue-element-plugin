<script setup lang="ts">
import { defineComponent } from 'vue';


const props = defineProps({
    options: {}
})

// 定义组件
const DynamicOptions = defineComponent({
    name: 'DynamicOptions'
})
</script>

<template>
    <el-select v-bind="$attrs">
        
    </el-select>
</template>
