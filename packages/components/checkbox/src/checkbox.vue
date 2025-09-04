<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { checkboxProps } from './checkbox'
import { AnyObject } from '@/types'
import { ElCheckbox, ElCheckboxButton } from 'element-plus'
import { useDefineModel, useRequest } from '@/hooks'
import { isString } from '@/utils'

defineOptions({
    name: 'FCheckbox'
})

const props = defineProps(checkboxProps)

/**
 * 远程请求数据
 */
const remoteRequestData = ref<AnyObject[]>([])
const checkboxValue = useDefineModel([], undefined, (value: any) => {
    // 需要数组格式
    return isString(value) ? value.split(',') : value
})

/**
 * 监听数据请求url，请求数据
 */
watchEffect(() => {
    if (props.url) {
        useRequest(props.url, {
            method: props.method
        }, props.onBeforeLoad, props.onLoadSuccess).then(resp => {
            remoteRequestData.value.splice(0, remoteRequestData.value.length, ...resp)
        })
    }
})

// 数据列表
const checkboxOptions = computed(() => {
    if (props.options) {
        // 优先指定数据
        return props.options
    }

    if (remoteRequestData.value.length > 0) {
        return remoteRequestData.value
    }

    return []
})

// 确认复选框样式
const checkType = computed(() => {
    return props.type == 'check' ? ElCheckbox : ElCheckboxButton
})

</script>

<template>
    <el-checkbox-group v-model="checkboxValue" v-bind="$attrs">
        <slot>
            <component 
                v-for="(item, index) in checkboxOptions" 
                v-bind="item" 
                :is="checkType" 
                :key="index" 
                :value="String(item[value])" 
                :disabled="item.disabled"
                :border="border"
            >
                <slot :name="item[value]" v-bind="item">
                    {{ item[label] }}
                </slot>
            </component>
        </slot>
  </el-checkbox-group>
</template>