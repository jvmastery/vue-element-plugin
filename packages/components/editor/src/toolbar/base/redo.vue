<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)

/**
 * 判断是否可以重做
 */
const disabled = computed(() => {
    return !editor?.value?.can().redo()
})

/**
 * 点击事件
 */
const click = () => {
    if (disabled.value) {
        return
    }

    editor?.value?.chain().focus().redo().run()
}
</script>

<template>
    <ToolbarItem
        name="undo"
        :use-active="false"
        title="重做（Ctrl+Shift+Z）"
        icon-position="-100px 0"
        :disabled="disabled"
        @click="click"
    />
</template>
