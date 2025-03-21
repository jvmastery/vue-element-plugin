<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import FSelect from '@/components/select'

const options = [
    // { label: '初号', value: '42px' },
    // { label: '小初', value: '36px' },
    // { label: '一号', value: '26px' },
    // { label: '小一号', value: '24px' },
    // { label: '二号', value: '22px' },
    // { label: '小二号', value: '20px' },
    // { label: '三号', value: '16px' },
    // { label: '小三号', value: '15px' },
    // { label: '四号', value: '14px' },
    // { label: '小四号', value: '12px' },
    // { label: '五号', value: '10.5px' },
    // { label: '小五号', value: '9px' },
    // { label: '六号', value: '7.5px' },
    // { label: '小六号', value: '6px' },
    // { label: '七号', value: '5.5px' },
    // { label: '8px', value: '8px' },
    // { label: '9px', value: '9px' },
    // { label: '10px', value: '10px' },
    // { label: '11px', value: '11px' },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '14px', value: '14px' },
    { label: '15px', value: '15px' },
    { label: '16px', value: '16px' },
    { label: '17px', value: '17px' },
    { label: '18px', value: '18px' },
    { label: '19px', value: '19px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
    { label: '36px', value: '36px' }
]

const editor = inject(EditorInstanceSymbol)

/**
 * 改变标题状态
 * @param value 当前选中的数据
 */
const change = (value: string) => {
    editor?.value?.chain().focus().setFontSize(value).run()
}

/**
 * 当前显示的标题级别
 */
const currentShowLevel = computed(() => {
    const current = options.find(item =>
        editor?.value?.isActive('textStyle', { fontSize: item.value })
    )
    return current ? current.value : '默认字号'
})

/**
 * 计算字体样式
 */
const computedStyle = (item: any) => {
    return {
        fontSize: item.value
    }
}
</script>

<template>
    <ToolbarItem name="font-size" :use-active="false" title="字号">
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
::v-deep(.el-select) {
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
