<!--    导航栏     -->
<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import toolbarComponents from './toolbar'
withDefaults(
    defineProps<{
        editor: Editor | undefined
        tools?: string[]
    }>(),
    {
        tools: () => [
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
            'table',
            'deleteTable',
            'insertRowBefore',
            'insertRowAfter',
            'deleteRow',
            'insertColumnBefore',
            'insertColumnAfter',
            'deleteColumn',
            'mergeCell',
            'splitCell'
        ]
    }
)
</script>

<template>
    <div class="toolbar-content">
        <template v-for="name in tools">
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
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
