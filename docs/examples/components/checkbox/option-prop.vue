<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    text: '选项一',
    key: '1'
},
{
    text: '选项二',
    key: '2'
},{
    text: '选项三',
    key: '3'
}]
const value = ref()
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-checkbox :options="options" v-model="value" value="key" label="text"></f-checkbox>
    </div>
</template>