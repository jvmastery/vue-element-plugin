<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)

/**
 * 判断是否可以撤销
 */
const disabled = computed(() => {
    return !editor?.value?.can().undo()
})

/**
 * 点击事件
 */
const click = () => {
    if (disabled.value) {
        return
    }

    editor?.value?.chain().focus().undo().run()
}
</script>

<template>
    <ToolbarItem
        name="undo"
        :use-active="false"
        title="撤销（Ctrl+Z）"
        icon-position="-160px 0"
        :disabled="disabled"
        @click="click"
    />
</template>
