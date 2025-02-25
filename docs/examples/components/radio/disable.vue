<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    label: '选项一',
    value: '1'
},
{
    label: '选项二',
    value: '2',
    disabled: true
},{
    label: '选项三',
    value: '3'
}]
const value = ref()
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-radio :options="options" v-model="value"></f-radio>
    </div>
</template>