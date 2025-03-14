<!--  加粗  -->
<script setup lang="ts">
import { inject } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor';

const editor = inject(EditorInstanceSymbol)
</script>  

<template>
    <ToolbarItem 
        name="removeformat" 
        title="清除格式" 
        :use-active="false" 
        icon-position="-580px 0" 
        @click="editor?.chain().focus().unsetAllMarks().run()"  
    />
</template>