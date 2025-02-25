<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    label: '选项一',
    value: '1'
},
{
    label: '选项二',
    value: '2',
    disabled: 'true'
},{
    label: '选项三',
    value: '3'
}]

const value = ref()
const value1 = ref()
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-checkbox :options="options" v-model="value" type="button"></f-checkbox>
        <br />
        当前选中的值：{{ value1 }}
        <f-checkbox :options="options" v-model="value1" type="button" :max="1"></f-checkbox>
    </div>
</template>