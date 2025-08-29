<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { AnyObject } from '@/types'
import { useRequest } from '@/hooks'
import { cascaderProps } from './cascader'

defineOptions({
    name: 'FCascader'
})

const props = defineProps(cascaderProps)

/**
 * 远程请求数据
 */
const remoteRequestData = ref<AnyObject[]>([])

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
const cascaderOptions = computed(() => {
    if (props.options) {
        // 优先指定数据
        return props.options
    }

    if (remoteRequestData.value.length > 0) {
        return remoteRequestData.value
    }

    return []
})
</script>

<template>
    <el-cascader
        :options="cascaderOptions"
        :props="{ ...$attrs, value: value, label: label }"
        filterable
        clearable
        v-bind="$attrs"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </el-cascader>
</template>
