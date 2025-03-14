<script setup lang="ts">
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { inject } from 'vue'

export type WordType = 'uppercase' | 'lowercase' | 'capitalize'

const props = withDefaults(defineProps<{
    type?: WordType,
    title?: string,
    position?: string
}>(), {
    type: 'uppercase',
    title: '字母大写',
    position: '-786px 0'
})

const editor = inject(EditorInstanceSymbol)

/**
 * 进行文字替换
 */
const click = () => {
    const state = editor?.value?.state
    if (!state) {
        return
    }
    const selection = state.selection

    // 获取当前选中的文本
    const selectedText = state?.doc.textBetween(selection.from, selection.to, ' ')

    if (!selectedText) return

    let transformedText = selectedText

    // 处理大小写转换
    if (props.type === 'uppercase') {
        transformedText = selectedText.toUpperCase()
    } else if (props.type === 'lowercase') {
        transformedText = selectedText.toLowerCase()
    } else if (props.type === 'capitalize') {
        transformedText = selectedText.replace(/\b\w/g, char => char.toUpperCase())
    }

    // 替换选中的文本
    editor.value?.commands.insertContent(transformedText)
}
</script>

<template>
    <ToolbarItem
        :name="type"
        :use-active="false"
        :title="title"
        :icon-position="position"
        @click="click"
    />
</template>
