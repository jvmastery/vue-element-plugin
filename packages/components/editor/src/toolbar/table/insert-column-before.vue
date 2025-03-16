<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="insert-row-before"
        title="前插入列"
        icon-position="-455px -76px"
        :use-active="false"
        :disabled="!editor?.can().addColumnBefore()"
        @click="editor?.chain().focus().addColumnBefore().run()"
    />
</template>
