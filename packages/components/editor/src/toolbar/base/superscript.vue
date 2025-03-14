<!--  加粗  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="superscript" title="上标（Ctrl+.）" icon-position="-620px 0" @click="editor?.chain().focus().toggleSuperscript().run()"  />
</template>