<template>
    <f-edit-table v-model="tableData" use-move optionsColumnWidth="250" :columns="editColumns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([])
const editColumns = [
    {
        label: '属性名',
        prop: 'label',
        align: 'center',
        required: true,
        width: 150
    },
    {
        label: '属性值',
        prop: 'name',
        required: true,
        align: 'center',
        width: 150
    },
    {
        label: '是否必填',
        prop: 'required',
        dataType: 'switch',
        align: 'center',
        width: 100,
        formatter: (row: any) => {
            console.log(row)
            return row.required ? '是' : '否'
        }
    },
    {
        label: '占据列数',
        prop: 'colspan',
        align: 'center',
        dataType: 'input-number',
        width: 200
    },
    {
        label: '自定义类型',
        prop: 'type',
        align: 'center',
        width: 230,
        dataType: 'select',
        type: 'tag',
        options: [
            {
                label: '单选框',
                value: 'radio'
            },
            {
                label: '复选框',
                value: 'checkbox'
            },
            {
                label: '下拉框',
                value: 'select'
            },
            {
                label: '级联选择框',
                value: 'cascader'
            },
            {
                label: '日期',
                value: 'date'
            },
            {
                label: '时段',
                value: 'daterange'
            },
            {
                label: '多行文本框',
                value: 'daterange'
            }
        ]
    },
]
</script>
