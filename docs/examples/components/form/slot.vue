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
    }
]

const form = ref({})
const value1 = ref()
</script>

<template>
    <f-form :fields="fiels" v-model="form">
        <template #nameLabel>
            我是自定义名称
            <el-tag type="primary">Tag 1</el-tag>
        </template>

        <template #time="{ field, data }">
            <el-slider v-model="value1" />
        </template>
    </f-form>
</template>
