<!--  有序列表  -->
<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { CaretBottom } from '@element-plus/icons-vue'
import SelectPicker from '../components/select-picker.vue';

/**
 * 定义样式
 */
const types = [{
    value: 'decimal',
    label: '1, 2, 3...'
}, {
    value: 'lower-alpha',
    label: 'a, b, c...',
}, {
    value: 'upper-alpha',
    label: 'A, B, C...',
}, {
    value: 'lower-roman',
    label: 'i, ii, iii...',
}, {
    value: 'upper-roman',
    label: 'I, II, III...',
}, {
    value: 'simp-chinese-informal',
    label: '一, 二, 三...',
}, {
    value: 'simp-chinese-formal',
    label: '壹, 贰, 叁...'
}]

const editor = inject(EditorInstanceSymbol)
const currentType = ref('decimal')

watch(currentType, () => {
    if (editor?.value?.isActive('orderedList')) {
        editor?.value?.chain().focus().updateAttributes('orderedList', { type: currentType.value }).run()
    }
})

/**
 * 改变
 */
const changeOrderedList = () => {
    editor?.value?.chain().focus().toggleOrderedList().updateAttributes('orderedList', { type: currentType.value }).run()
}
</script>  

<template>
    <ToolbarItem name="orderedList" title="有序列表" icon-position="-80px 0" @click="changeOrderedList">
        <template #button-extra>
            <div class="picker-button" @click.stop>
                <el-popover
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #reference>
                        <el-icon size="10px">
                            <CaretBottom />
                        </el-icon>
                    </template>

                    <SelectPicker v-model="currentType" :options="types" />
                </el-popover>
            </div>
        </template>
    </ToolbarItem>
</template>

<style lang="scss" scoped>
.picker-button {
    padding-left: 1px;
    height: 18px;
    display: flex;
    align-items: center;

    &:hover {
        padding-left: 0;
        border-left: 1px solid #dcac6c;
    }
}
</style>