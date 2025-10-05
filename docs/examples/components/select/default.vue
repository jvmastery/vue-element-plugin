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
const value = ref('1')
const value2 = ref(['1', 2])
const value3 = ref('1,2')
</script>

<template>
    <div>
        当前选中的值：{{ value }}
        <f-select :options="options" v-model="value">
        </f-select>

        多选默认值：{{ value2 }}
        <f-select :options="options" multiple v-model="value2">
        </f-select>

        多选默认值：{{ value3 }}
        <f-select :options="options" multiple v-model="value3">
        </f-select>
    </div>
</template>