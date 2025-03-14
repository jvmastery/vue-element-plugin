<script setup lang="ts">
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { inject } from 'vue'

const editor = inject(EditorInstanceSymbol)
</script>

<template>
    <ToolbarItem
        name="unlink"
        :use-active="false"
        title="取消链接"
        icon-position="-640px 0"
        @click="editor?.chain().focus().extendMarkRange('link').unsetLink().run()"
    />
</template>
