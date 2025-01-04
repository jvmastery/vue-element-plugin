<script setup lang="ts">
import { computed, PropType, ref, watch, watchEffect, useSlots, defineModel } from 'vue'
import { getRequest } from '../../../axiosInstance'
import type { CheckboxValueType } from 'element-plus'

const props = defineProps({
    /**
     * 数据请求方式
     */
    url: String,
    /**
     * 数据请求方法
     */
    method: {
        type: String,
        default: 'GET'
    },
    /**
     * 请求完成后的回调，对返回数据进行处理
     */
    onLoadSuccess: Function,
    /**
     * 数据请求前的回调，对请求参数进行处理
     * 返回的是一个json字符串，否则会有问题
     */
    onBeforeLoad: Function,
    /**
     * 显示项
     */
    options: {
        type: Array as PropType<AnyObject[]>
    },
    /**
     * 是否可清空
     */
    clearable: {
        type: Boolean,
        default: true
    },
    /**
     * 是否有全选功能
     */
    selectAll: {
        type: Boolean,
        default: false
    },
    /**
     * 选项值的属性
     */
    value: {
        type: String,
        default: 'value'
    },
    /**
     * 选项配置
     */
    label: {
        type: String,
        default: 'label'
    }
})
const slots = useSlots()
const selectValue = defineModel()

// 全选功能
const checkAll = ref(false)
const indeterminate = ref(false)

/**
 * 监听数据请求url，请求数据
 */
watchEffect(() => {
    getRequest(props.url, props.method, props.onBeforeLoad, props.onLoadSuccess).then(resp => {
        remoteRequestData.value.splice(0, remoteRequestData.value.length, ...showResult)
    })
})

// 监听是否已经全选
watch(selectValue, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === selectOptions.length) {
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
    selectValue.value = selectOptions.value.map((_) => _.value)
  } else {
    selectValue.value = []
  }
}
</script>

<template>
    <el-select v-model="selectValue" v-bind="$attrs" :clearable="clearable">
        <template v-if="slots.header" #header>
            <slot name="header" :options="selectOptions" />
        </template>

        <!--  全选功能  -->
        <template v-if="!slots.header && selectAll" #header>
            <el-checkbox
                v-model="checkAll"
                :indeterminate="indeterminate"
                @change="handleCheckAll"
            >
                全选
            </el-checkbox>
        </template>

        <slot :options="selectOptions">
            <el-option
                v-for="item in selectOptions"
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
