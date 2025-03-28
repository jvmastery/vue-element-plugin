<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import FSelect from '@/components/select'
import { Level } from '@tiptap/extension-heading'

const options = [
    {
        label: '正文',
        value: 'text'
    },
    {
        label: '标题一',
        value: 'h1',
        level: 1
    },
    {
        label: '标题二',
        value: 'h2',
        level: 2
    },
    {
        label: '标题三',
        value: 'h3',
        level: 3
    },
    {
        label: '标题四',
        value: 'h4',
        level: 4
    },
    {
        label: '标题五',
        value: 'h5',
        level: 5
    },
    {
        label: '标题六',
        value: 'h6',
        level: 6
    }
]

const editor = inject(EditorInstanceSymbol)

/**
 * 改变标题状态
 * @param value 当前选中的数据
 */
const change = (value: string) => {
    const currentLevel = options.find(item => item.value == value)
    if (currentLevel) {
        if (currentLevel.level) {
            editor?.value?.chain().focus().setHeading({ level: currentLevel.level as Level }).run()
        } else {
            editor?.value?.chain().focus().setNode('paragraph').run()
        }
    }
}

/**
 * 当前显示的标题级别
 */
const currentShowLevel = computed(() => {
    const current = options.find(item => item.level && editor?.value?.isActive('heading', { level: item.level }))
    return current ? current.value : 'text'
})

/**
 * 计算字体样式
 */
 const computedStyle = (item: any, index: number) => {
    const size = index == 0 ? 16 : 24 - (index - 1) * 2
    return {
        fontSize: size + 'px',
        fontWeight: 600,
        minWidth: '100px',
    }
}
</script>

<template>
    <ToolbarItem name="head" :use-active="false" title="段落格式">
        <f-select
            popper-class="heading"
            :options="options"
            v-model="currentShowLevel"
            :clearable="false"
            :style-formatter="computedStyle"
            @change="change"
        />
    </ToolbarItem>
</template>

<style lang="scss" scoped>
:deep(.el-select) {
    width: 80px;

    .el-select__wrapper {
        line-height: 18px;
        min-height: 18px;
        padding: 4px 5px;
        font-size: 12px;

        &:hover {
            background-color: #fff5d4;
            border-radius: 0;
            box-shadow: 0 0 0 1px #dcac6c inset;
        }

        &.is-focused {
            box-shadow: 0 0 0 1px #dcdfe6 inset;
        }
    }
}
</style>
