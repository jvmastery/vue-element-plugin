<!-- 倾斜 -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem name="italic" title="倾斜（Ctrl+I）" icon-position="-60px 0" @click="editor?.chain().focus().toggleItalic().run()"  />
</template>