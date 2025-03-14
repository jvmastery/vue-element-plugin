<!--  设置字体颜色  -->
<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
const currentColor = ref('#000')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const colorPicker = ref()

/**
 * 手动显示颜色选择框
 */
const showColorPicker = () => {
    colorPicker.value.show()
}

/**
 * 改变颜色
 */
const changeColor = () => {
    editor?.value?.chain().focus().setColor(currentColor.value).run()
}
</script>  

<template>
    <ToolbarItem name="font-color" 
        title="字体颜色" 
        icon-position="-720px 0" 
        :use-active="false" 
        @click="changeColor">
        <template #button-extra>
            <el-color-picker 
                ref="colorPicker" 
                @click.stop="showColorPicker" 
                v-model="currentColor" 
                show-alpha 
                :predefine="predefineColors" 
                size="small" 
                @change="changeColor"
            />
        </template>
    </ToolbarItem>
    
</template>

<style lang="scss" scoped>
::v-deep(.el-color-picker) {
    height: 20px;

    .el-color-picker__trigger {
        border: 0;
        height: 20px;
        width: 18px;
        padding-left: 2px;
    }
}
</style>