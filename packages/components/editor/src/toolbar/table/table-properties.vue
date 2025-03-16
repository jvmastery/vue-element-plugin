<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="cell-properties"
        title="表格属性"
        icon-position="-420px -40px"
        :use-active="false"
        :disabled="!editor?.can().deleteRow()"
        @click="editor?.chain().focus().deleteRow().run()"
    />
</template>
