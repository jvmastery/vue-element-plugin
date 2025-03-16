<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="insert-row-after"
        title="后插入行"
        icon-position="-498px -76px"
        :use-active="false"
        :disabled="!editor?.can().addRowAfter()"
        @click="editor?.chain().focus().addRowAfter().run()"
    />
</template>
