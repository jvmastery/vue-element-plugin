<script setup lang="ts">
const columns = [
  {
    label: '名称',
    prop: 'name',
    width: 100,
    sortable: true
  },
  {
    label: '日期',
    prop: 'date',
    width: 650,
  },
  {
    label: '地址',
    prop: 'address',
    width: 650,
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
