<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)

/**
 * 改变文本输入方向
 */
const click = () => {
    editor?.value?.chain().focus().setTextDirection('rtl').run()
}

/**
 * 计算字体样式
 */
const computedActive = computed(() => {
    const direct = editor?.value?.getAttributes('paragraphPlus').dir
    return direct == 'rtl'
})
</script>

<template>
    <ToolbarItem
        name="direction-rtl"
        :active="computedActive"
        title="从右向左输入"
        icon-position="-40px -20px"
        @click="click"
    />
</template>