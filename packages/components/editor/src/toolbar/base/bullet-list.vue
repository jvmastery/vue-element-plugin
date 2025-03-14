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
    value: 'disc',
    label: '● 小圆点'
}, {
    value: 'circle',
    label: '○ 空心圆',
}, {
    value: 'square',
    label: '■ 方块',
}, {
    value: 'disclosure-closed',
    label: '▶ 右三角型',
}, {
    value: 'disclosure-open',
    label: '▼ 倒三角型',
}]

const editor = inject(EditorInstanceSymbol)
const currentType = ref('disc')

watch(currentType, () => {
    if (editor?.value?.isActive('bulletList')) {
        editor?.value?.chain().focus().updateAttributes('bulletList', { type: currentType.value }).run()
    }
})

/**
 * 改变
 */
const changeBulletList = () => {
    editor?.value?.chain().focus().toggleBulletList().updateAttributes('bulletList', { type: currentType.value }).run()
}
</script>  

<template>
    <ToolbarItem name="bulletList" title="无序列表" icon-position="-20px 0" @click="changeBulletList">
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