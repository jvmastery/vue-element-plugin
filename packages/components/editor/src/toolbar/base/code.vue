<!--  加粗  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="code" title="代码（Ctrl+E）" icon-position="0 0" @click="editor?.chain().focus().toggleBold().run()"  />
</template>