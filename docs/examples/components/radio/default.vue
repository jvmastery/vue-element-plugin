<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    label: '选项一',
    value: 1
},
{
    label: '选项二',
    value: 2
},{
    label: '选项三',
    value: 3
}]
const value = ref(3)
const value1 = ref('1')
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-radio :options="options" v-model="value"></f-radio>
        <br />
        字符串类型：{{ value1 }}
        <f-radio :options="options" v-model="value1"></f-radio>
    </div>
</template>