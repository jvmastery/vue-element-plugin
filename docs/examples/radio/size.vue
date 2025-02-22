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
        大尺寸：
        <f-radio :options="options" v-model="value" size="large" border></f-radio>
        <br />
        默认尺寸：
        <f-radio :options="options" v-model="value" border></f-radio>
        <br />
        小尺寸：
        <f-radio :options="options" v-model="value" size="small" border></f-radio>
    </div>
</template>