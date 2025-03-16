<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="delete-table"
        title="合并单元格"
        icon-position="-760px -20px"
        :use-active="false"
        :disabled="!editor?.can().mergeCells()"
        @click="editor?.chain().focus().mergeCells().run()"
    />
</template>
