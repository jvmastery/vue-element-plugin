<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="insert-row-after"
        title="后插入列"
        icon-position="-435px -76px"
        :use-active="false"
        :disabled="!editor?.can().addColumnAfter()"
        @click="editor?.chain().focus().addColumnAfter().run()"
    />
</template>
