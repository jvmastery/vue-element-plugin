<script setup lang="ts">
import { AnyObject } from '@/types';

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

const formatterResult = (result: AnyObject) => {
    return result.data.data
}
</script>

<template>
    <f-table :columns="columns" url="/base/table/page" :on-load-success="formatterResult" />
</template>
