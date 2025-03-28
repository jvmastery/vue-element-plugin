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
        searchable: true,
        type: 'daterange',
        searchDefault: ['2025-01-02', '2025-01-06']
    },
    {
        label: '性别',
        prop: 'sex',
        searchable: true,
        searchDefault: '男',
        type: 'select',
        options: [
            {
                label: '男',
                value: '男'
            },
            {
                label: '女',
                value: '女'
            }
        ]
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
        address: '地址信息s',
        sex: i % 2 == 0 ? '男' : '女'
    })
}
</script>

<template>
    <f-table :columns="columns" :data="tableData" max-height="300px" />
</template>
