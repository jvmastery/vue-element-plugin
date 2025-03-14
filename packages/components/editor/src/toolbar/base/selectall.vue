<!--  全选  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="selectall" :use-active="false" title="全选" icon-position="-400px -20px" @click="editor?.chain().focus().selectAll().run()"  />
</template>