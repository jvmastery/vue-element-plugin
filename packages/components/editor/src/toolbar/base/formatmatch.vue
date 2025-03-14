<!--  加粗  -->
<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

interface Options {
    [key: string]: Record<string, any>
}

const FORMAT_OPTIONS = ['textStyle', 'bold', 'italic', 'strike', 'underline']
const editor = inject(EditorInstanceSymbol)
const copiedFormat = ref<Options>()
const activeFormat = ref(false)

/**
 * 复制样式
 */
const copyFormat = () => {
    const currentOptions: AnyObject = {}
    FORMAT_OPTIONS.forEach(item => {
        const attrs = editor?.value?.getAttributes(item);
        if (attrs && Object.keys(attrs).length) {
            currentOptions[item] = attrs; // 只复制已应用的格式
        }
    })

    copiedFormat.value = currentOptions

    // console.log(copiedFormat.value)
}

/**
 * 粘贴样式
 */
const pasteFormat = () => {
    if (copiedFormat.value) {
        if (!Object.keys(copiedFormat.value).length) return;
        editor?.value?.chain().focus().unsetAllMarks().run();

        Object.entries(copiedFormat.value).forEach(([mark, attrs]) => {
            editor?.value?.chain().focus().setMark(mark, attrs).run();
        });

        console.log('paste', copiedFormat.value)
        // editor?.value?.chain().focus().setMark('textStyle', copiedFormat.value).run();
    }
}

/**
 * 改变格式刷样式
 */
const toggleFormat = () => {
    if (activeFormat.value) {
        copiedFormat.value = undefined
        activeFormat.value = false
    } else {
        copyFormat()
        activeFormat.value = true

        editor?.value?.view.dom.addEventListener('mouseup', () => {
            pasteFormat()
        })
    }
}


</script>  

<template>
    <ToolbarItem 
        name="formatmatch" 
        title="格式刷" 
        icon-position="-40px 0" 
        :active-function="() => activeFormat"
        @click="toggleFormat"  
    />
</template>