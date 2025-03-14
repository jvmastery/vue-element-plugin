<!--  加粗  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="subscript" title="下标（Ctrl+,）" icon-position="-600px 0" @click="editor?.chain().focus().toggleSubscript().run()"  />
</template>