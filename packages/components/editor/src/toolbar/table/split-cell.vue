<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="delete-table"
        title="拆分单元格"
        icon-position="-800px -20px"
        :use-active="false"
        :disabled="!editor?.can().splitCell()"
        @click="editor?.chain().focus().splitCell().run()"
    />
</template>
