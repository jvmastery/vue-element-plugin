<script setup lang="ts">
import { ref } from 'vue';


const visiable = ref(false)

const openDialog = () => {
    visiable.value = true
}
</script>

<template>
    <el-button @click="openDialog">打开弹窗</el-button>
    <FDialog v-model="visiable" />
</template>