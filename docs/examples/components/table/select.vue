<script setup lang="ts">
import { TableInstance } from '@/components'
import { ref } from 'vue'

const columns = [
    {
        label: '名称',
        prop: 'name',
        width: 100
    },
    {
        label: '日期',
        prop: 'date',
        width: 150
    },
    {
        label: '地址',
        prop: 'address'
    }
]

const tableData: any[] = []
for (let i = 1; i < 22; i++) {
    tableData.push({
        date: '2025-01-' + (i < 10 ? '0' + i : i),
        name: 'name' + i,
        address: '地址信息s'
    })
}

const tableRef = ref<TableInstance>()
const getSelectRow = () => {
  alert(JSON.stringify(tableRef.value?.tableInstance?.getSelectionRows()))
}
</script>

<template>
    多选模式：
    <el-button @click="getSelectRow">获取选中数据</el-button>
    <f-table :columns="columns" ref="tableRef" :data="tableData" height="300px" type="selection" />

    索引模式：
    <f-table :columns="columns" :data="tableData" height="300px" type="index" />
</template>
