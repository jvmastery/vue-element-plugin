<script setup lang="ts">
import { computed, ref, watch, watchEffect, useSlots } from 'vue'
import type { CheckboxValueType } from 'element-plus'
import { selectProps } from './select'
import { AnyObject } from '@/types'
import { useRequest } from '@/hooks'

defineOptions({
    name: 'FSelect'
})

const props = defineProps(selectProps)
const slots: any = useSlots()
const selectValue = defineModel({ required: true })

// 全选功能
const checkAll = ref(false)
const indeterminate = ref(false)

/**
 * 远程请求数据
 */
const remoteRequestData = ref<AnyObject[]>([])

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

// 监听是否已经全选
watch(selectValue, (val: any) => {
    if (val == undefined || val.length === 0) {
        checkAll.value = false
        indeterminate.value = false
    } else if (val.length === selectOptions.value.length) {
        checkAll.value = true
        indeterminate.value = false
    } else {
        indeterminate.value = true
    }
})

// 数据列表
const selectOptions = computed(() => {
    if (props.options) {
        // 优先指定数据
        return props.options
    }

    if (remoteRequestData.value.length > 0) {
        return remoteRequestData.value
    }

    return []
})

/**
 * 全选
 * @param val
 */
const handleCheckAll = (val: CheckboxValueType) => {
    indeterminate.value = false
    if (val) {
        selectValue.value = selectOptions.value.map(_ => _.value)
    } else {
        selectValue.value = []
    }
}

/**
 * 计算样式
 */
const optionStyles = (option: any, index: number) => {
    if (props.styleFormatter) {
        return { ...props.styleFormatter(option, index) }
    }

    return
}
</script>

<template>
    <el-select v-model="selectValue" v-bind="$attrs" style="width: 200px" :clearable="clearable">
        <template v-if="slots.header" #header>
            <slot name="header" :options="selectOptions" />
        </template>

        <!--  全选功能  -->
        <template v-if="!slots.header && selectAll" #header>
            <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                全选
            </el-checkbox>
        </template>

        <slot :options="selectOptions">
            <el-option
                v-for="(item, index) in selectOptions"
                :class="[useValueClass ? item[value] : '']"
                :style="optionStyles(item, index)"
                :key="item[value]"
                :label="item[label]"
                :value="item[value]"
                :disabled="item.disabled"
            />
        </slot>

        <template v-if="slots.footer" #footer>
            <slot name="footer" :options="selectOptions" />
        </template>
    </el-select>
</template>
