<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="insert-row-before"
        title="前插入行"
        icon-position="-478px -76px"
        :use-active="false"
        :disabled="!editor?.can().addRowBefore()"
        @click="editor?.chain().focus().addRowBefore().run()"
    />
</template>
