<script setup lang="ts">
import { OptionData } from '@/components'
import { Plus } from '@element-plus/icons-vue'

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

const buttons = [{
    name: '修改',
    type: "primary",
    click: ({ row, column }: OptionData) => {
        console.log(column)
        alert(row?.name)
    }
}, {
    name: '删除',
    type: "danger",
    confirm: true
}]

const tools = [{
    name: '增加',
    type: "primary",
    icon: Plus
}]

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
    <f-table :columns="columns" :data="tableData" :optionsButtons="buttons" :toolButtons="tools" height="300px" />
</template>
