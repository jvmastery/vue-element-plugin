<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    label: '选项一',
    value: '1'
},
{
    label: '选项二',
    value: '2'
},{
    label: '选项三',
    value: '3'
}]
const value = ref()
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-select multiple :options="options" v-model="value"></f-select>
        <f-select multiple collapse-tags :options="options" v-model="value"></f-select>
        <f-select multiple collapse-tags :max-collapse-tags="2" select-all :options="options" v-model="value"></f-select>
    </div>
</template>