<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="delete-table"
        title="删除行"
        icon-position="-660px -20px"
        :use-active="false"
        :disabled="!editor?.can().deleteRow()"
        @click="editor?.chain().focus().deleteRow().run()"
    />
</template>
