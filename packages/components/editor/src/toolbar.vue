<!--    导航栏     -->
<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import toolbarComponents from './toolbar'
console.log(toolbarComponents)
defineProps<{
    editor: Editor | undefined
}>()

const showTools = [
    'undo',
    'redo',
    'bold',
    'italic',
    'underline',
    'strike',
    'subscript',
    'superscript',
    'removeformat',
    'formatmatch',
    'color',
    'backgroudColor',
    'orderList',
    'bulletList',
    'selectall',
    'cleardoc',
    'head',
    'fontFamily',
    'fontSize',
    'directionLtr',
    'directionRtl',
    'indent',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyJustify',
    'uppercase',
    'lowercase',
    'link',
    'unlink',
    'image',
    'table'
]
</script>

<template>
    <div class="toolbar-content">
        <template v-for="name in showTools">
            <slot :name="name">
                <component :is="toolbarComponents[name]" />
            </slot>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.toolbar-content {
    display: flex;
    align-items: center;
}
</style>
