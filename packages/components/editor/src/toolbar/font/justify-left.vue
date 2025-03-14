<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const props = withDefaults(defineProps<{
    align?: string
    title?: string
    position?: string
}>(), {
    align: 'left',
    title: '居左对齐',
    position: '-460px 0'
})

const editor = inject(EditorInstanceSymbol)

const click = () => {
    editor?.value?.chain().focus().setTextAlign(props.align).run()
}

const computedActive = computed(() => {
    return editor?.value?.isActive({ textAlign: props.align })
})
</script>

<template>
    <ToolbarItem
        :name="'justify-' + align"
        :active="computedActive"
        :title="title"
        :icon-position="position"
        @click="click"
    />
</template>