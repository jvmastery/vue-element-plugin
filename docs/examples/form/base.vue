<script lang="ts" setup>
import { ref } from 'vue';
import type { FormField } from '@/components/form/src';

const fiels: FormField[] = [{
    name: 'name',
    label: '名称',
    rules: [{ required: true, message: 'age is required' }]
},{
    name: 'time',
    label: '出生日期',
    type: 'date-picker'
},{
    name: 'sex',
    label: '性别',
    type: 'radio',
    options: [{
        label: '男',
        value: 1
    },{
        label: '女',
        value: 0
    }]
},{
    name: 'favoir',
    label: '爱好',
    type: 'checkbox',
    options: [{
        label: '运动',
        value: 1
    },{
        label: '唱歌',
        value: 0
    },{
        label: '旅游',
        value: 2
    }]
},{
    name: 'educate',
    label: '是否入学',
    type: 'switch'
},{
    name: 'timerange',
    label: '入学时段',
    type: 'date-picker',
    colspan: 2,
    attrs: {
        type: 'datetimerange'
    }
},{
    name: 'description',
    label: '备注',
    colspan: 2,
    rows: 3,
    attrs: {
        type: 'textarea'
    }
}]

const form = ref({})
</script>

<template>
    表单数据：{{ form }}
    <f-form :fields="fiels" v-model="form"/>
</template>