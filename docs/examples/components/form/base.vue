<script lang="ts" setup>
import { FormField } from '@/components'
import { ref } from 'vue'

const fiels: FormField[] = [
    {
        name: 'name',
        label: '名称',
        rules: [{ required: true, message: 'age is required' }]
    },
    {
        name: 'time',
        label: '出生日期',
        type: 'date',
        required: true
    },
    {
        name: 'sex',
        label: '性别',
        type: 'radio',
        options: [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 0
            }
        ]
    },
    {
        name: 'favoir',
        label: '爱好',
        type: 'checkbox',
        defaultValue: "1",
        options: [
            {
                label: '运动',
                value: 1
            },
            {
                label: '唱歌',
                value: 0
            },
            {
                label: '旅游',
                value: 2
            }
        ]
    },
    {
        name: 'favoir1',
        label: '爱好1',
        type: 'cascader',
        options: [
            {
                label: '运动',
                value: 1,
                children: [
                    {
                        label: '篮球',
                        value: 10
                    }
                ]
            },
            {
                label: '唱歌',
                value: 0
            },
            {
                label: '旅游',
                value: 2
            }
        ]
    },
    {
        name: 'favoir-s',
        label: '爱好',
        type: 'select',
        defaultValue: 2,
        options: [
            {
                label: '运动',
                value: 1
            },
            {
                label: '唱歌',
                value: 0
            },
            {
                label: '旅游',
                value: 2
            }
        ]
    },
    {
        name: 'educate',
        label: '是否入学',
        type: 'switch'
    },
    {
        name: 'timerange',
        label: '入学时段',
        type: 'date',
        colspan: 2,
        attrs: {
            type: 'datetimerange'
        }
    },
    {
        name: 'description',
        label: '备注',
        colspan: 2,
        rows: 3,
        attrs: {
            type: 'textarea'
        }
    },
    {
        name: 'editTable',
        label: '编辑列表',
        colspan: 2,
        type: 'edit-table',
        columns: [
            {
                label: '存储值',
                prop: 'code',
                width: 150,
                required: true
            },
            {
                label: '显示值',
                prop: 'value',
                required: true
            }
        ]
    }
]

const form = ref()
</script>

<template>
    表单数据：{{ form }}
    <f-form :fields="fiels" v-model="form" />
</template>
