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
        type: 'date'
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
    }
]

const form = ref({})
</script>

<template>
    表单数据：{{ form }}
    <f-form :fields="fiels" v-model="form" />
</template>
