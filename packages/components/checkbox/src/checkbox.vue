<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { getRequest } from '../../../axiosInstance'
import { checkboxProps } from './checkbox'

defineOptions({
    name: 'FCheckbox'
})

const props = defineProps(checkboxProps)

/**
 * 远程请求数据
 */
const remoteRequestData = ref<AnyObject[]>([])

/**
 * 监听数据请求url，请求数据
 */
watchEffect(() => {
    getRequest(props.url, props.method, props.onBeforeLoad, props.onLoadSuccess).then(resp => {
        remoteRequestData.value.splice(0, remoteRequestData.value.length, ...resp)
    })
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
    return props.type == 'check' ? 'el-checkbox' : 'el-checkbox-button'
})

</script>

<template>
    <el-checkbox-group v-bind="$attrs">
        <slot>
            <component 
                v-for="(item, index) in checkboxOptions" 
                v-bind="item" 
                :is="checkType" 
                :key="index" 
                :value="item[value]" 
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