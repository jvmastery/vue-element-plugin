<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { checkboxProps } from './checkbox'
import { AnyObject } from '@/types'
import { ElCheckbox, ElCheckboxButton } from 'element-plus'
import { useRequest } from '@/hooks'

defineOptions({
    name: 'FCheckbox'
})

const props = defineProps(checkboxProps)

/**
 * 远程请求数据
 */
const remoteRequestData = ref<AnyObject[]>([])
const checkboxValue = defineModel<number | string | (string | number)[]>({
    type: Array,
    default: () => []
})

// 转换代理：确保内部始终是数组
const innerValue = computed({
    get() {
        let arr: any[] = []
        if (Array.isArray(checkboxValue.value)) {
            arr = checkboxValue.value
        } else if (typeof checkboxValue.value === 'string') {
            arr = checkboxValue.value.split(props.separator)
        } else if (typeof checkboxValue.value === 'number') {
            arr = [checkboxValue.value]
        }

        // ✅ 统一转为字符串数组传给 el-select
        return arr.map(v => String(v))
    },
    set(val) {
        checkboxValue.value = val
    }
})

/**
 * 监听数据请求url，请求数据
 */
watchEffect(() => {
    if (props.url) {
        useRequest(
            props.url,
            {
                method: props.method
            },
            props.onBeforeLoad,
            props.onLoadSuccess
        ).then(resp => {
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
    <el-checkbox-group v-model="innerValue" v-bind="$attrs">
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
