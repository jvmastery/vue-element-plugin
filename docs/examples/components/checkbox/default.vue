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
const value = ref([2,3])
const value1 = ref('1,2')
const value2 = ref(1)
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-checkbox :options="options" v-model="value"></f-checkbox>

        设置字符串进行分割转换：{{ value1 }}
        <f-checkbox :options="options" v-model="value1"></f-checkbox>

        数字直接转换：{{ value2 }}
        <f-checkbox :options="options" v-model="value2"></f-checkbox>
    </div>
</template>