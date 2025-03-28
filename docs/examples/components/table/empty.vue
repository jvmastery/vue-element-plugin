<script setup lang="ts">
const columns = [
    {
        label: '名称',
        prop: 'name',
        width: 100,
        searchable: true
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
</script>

<template>
    <f-table :columns="columns" :data="tableData">
        <template #empty>暂无数据</template>
    </f-table>
</template>
