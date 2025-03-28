<script setup lang="ts">
const columns = [
    {
        label: '名称',
        prop: 'name',
        align: 'center',
        width: 100,
        searchable: true
    },
    {
        label: '日期',
        prop: 'date',
        align: 'center',
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
</script>

<template>
    <f-table :columns="columns" :data="tableData" height="300px" />
</template>
