<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    name: '选项一',
    code: '1'
},
{
    name: '选项二',
    code: '2'
},{
    name: '选项三',
    code: '3'
}]
const value = ref()
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-select :options="options" label="name" value="code" v-model="value">
        </f-select>
    </div>
</template>