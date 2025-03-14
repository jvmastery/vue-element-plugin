<!--  加粗  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="underline" title="下划线（Ctrl+U）" icon-position="-140px 0" @click="editor?.chain().focus().toggleUnderline().run()"  />
</template>