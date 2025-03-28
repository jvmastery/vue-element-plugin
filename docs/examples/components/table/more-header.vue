<script setup lang="ts">
const columns = [
    {
        label: '名称',
        prop: 'name',
        width: 100
    },
    {
        label: '一级表头信息',
        align: 'center',
        children: [
            {
                label: '日期',
                prop: 'date',
                width: 150
            },
            {
                label: '地址',
                children: [
                    {
                        label: '住址',
                        prop: 'address'
                    },
                    {
                        label: '省份',
                        prop: 'province'
                    }
                ]
            }
        ]
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
