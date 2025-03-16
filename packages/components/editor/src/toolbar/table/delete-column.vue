<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="delete-table"
        title="删除列"
        icon-position="-640px -20px"
        :use-active="false"
        :disabled="!editor?.can().deleteColumn()"
        @click="editor?.chain().focus().deleteColumn().run()"
    />
</template>
