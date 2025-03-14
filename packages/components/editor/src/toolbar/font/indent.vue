<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)

/**
 * 改变文本输入方向
 */
const click = () => {
    if (computedActive.value) {
        editor?.value?.chain().focus().removeTextIndent().run()
    } else {
        editor?.value?.chain().focus().setTextIndent('2em').run()
    }
}

/**
 * 计算字体样式
 */
const computedActive = computed(() => {
    const textIndent = editor?.value?.getAttributes('paragraphPlus').textIndent
    return textIndent && textIndent !== '0em'
})
</script>

<template>
    <ToolbarItem
        name="text-indent"
        :active="computedActive"
        title="从左向右输入"
        icon-position="-400px 0"
        @click="click"
    />
</template>