<script lang="ts" setup>
import { ref } from 'vue'
import type { FormField } from '@/components'

const fiels: FormField[] = [
    {
        name: 'name',
        label: '名称'
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
    },
    {
        name: 'favoir',
        label: '爱好',
        type: 'checkbox',
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
    }
]

const form = ref({})
</script>

<template>
    <f-form :fields="fiels" v-model="form" :col-size="1" />
</template>
