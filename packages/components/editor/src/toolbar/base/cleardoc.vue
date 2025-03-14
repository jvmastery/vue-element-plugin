<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { ElMessageBox } from 'element-plus'

const editor = inject(EditorInstanceSymbol)

const confirmClear = () => {
    ElMessageBox.confirm('确定清空当前文档吗？', '清空确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        editor?.value?.chain().focus().clearContent(true).run()
    })
}
</script>

<template>
    <ToolbarItem
        name="cleardoc"
        :use-active="false"
        title="清空文档"
        icon-position="-520px 0"
        @click="confirmClear"
    />
</template>
