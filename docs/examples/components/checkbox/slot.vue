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
        <f-checkbox :options="options" v-model="value">
            <template v-slot:3="item">
                自定义选项三配置：{{ item.value }}
            </template>
        </f-checkbox>
    </div>
</template>