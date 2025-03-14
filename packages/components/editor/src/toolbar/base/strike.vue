<!--  删除线  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="strike" title="删除线（Ctrl+Shift+S）" icon-position="-120px 0" @click="editor?.chain().focus().toggleStrike().run()"  />
</template>