<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)

/**
 * 改变文本输入方向
 */
const click = () => {
    editor?.value?.chain().focus().setTextDirection('ltr').run()
}

/**
 * 计算字体样式
 */
const computedActive = computed(() => {
    const direct = editor?.value?.getAttributes('paragraphPlus').dir
    return direct !== 'rtl'
})
</script>

<template>
    <ToolbarItem
        name="direction-ltr"
        :active="computedActive"
        title="从左向右输入"
        icon-position="-20px -20px"
        @click="click"
    />
</template>