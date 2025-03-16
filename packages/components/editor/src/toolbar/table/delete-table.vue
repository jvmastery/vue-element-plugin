<script setup lang="ts">
import { inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { ElMessageBox } from 'element-plus'

const editor = inject(EditorInstanceSymbol)

const sureToDeleteTable = () => {
    ElMessageBox.confirm('确定删除当前表格吗？', '删除确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        editor?.value?.chain().focus().deleteTable().run()
    })
}
</script>

<template>
    <ToolbarItem
        name="delete-table"
        title="删除表格"
        icon-position="-620px -20px"
        :use-active="false"
        :disabled="!editor?.can().deleteTable()"
        @click="sureToDeleteTable"
    />
</template>
