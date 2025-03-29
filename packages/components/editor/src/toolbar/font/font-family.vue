<script setup lang="ts">
import { computed, inject } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import FSelect from '@/components/select'

const options = [
    {
        label: '宋体',
        value: '宋体, SimSun'
    },
    {
        label: '新宋体',
        value: '新宋体, NSimSun'
    },
    {
        label: '黑体',
        value: '黑体, SimHei'
    },
    {
        label: '微软雅黑',
        value: '微软雅黑, Microsoft YaHei'
    },
    {
        label: '楷体',
        value: '楷体, KaiTi'
    },
    {
        label: '楷体_GB2312',
        value: '楷体_GB2312, KaiTi_GB2312'
    },
    {
        label: '仿宋',
        value: '仿宋, FangSong'
    },
    {
        label: '仿宋_GB2312',
        value: '仿宋_GB2312, FangSong_GB2312'
    },
    {
        label: '隶书',
        value: '隶书, LiSu'
    },
    {
        label: '幼圆',
        value: '幼圆, YouYuan'
    },
    {
        label: '华文细黑',
        value: '华文细黑, STXihei'
    },
    {
        label: '华文楷体',
        value: '华文楷体, STKaiti'
    },
    {
        label: '华文宋体',
        value: '华文宋体, STSong'
    },
    {
        label: '华文中宋',
        value: '华文中宋, STZhongsong'
    },
    {
        label: '华文仿宋',
        value: '华文仿宋, STFangsong'
    },
    {
        label: '华文行楷',
        value: '华文行楷, STXingkai'
    },
    {
        label: '华文隶书',
        value: '华文隶书, STLiti'
    },
    {
        label: 'Arial',
        value: 'Arial, sans-serif'
    },
    {
        label: 'Arial Black',
        value: 'Arial Black, sans-serif'
    },
    {
        label: 'Verdana',
        value: 'Verdana, sans-serif'
    },
    {
        label: 'Tahoma',
        value: 'Tahoma, sans-serif'
    },
    {
        label: 'Impact',
        value: 'Impact, sans-serif'
    },
    {
        label: 'Times New Roman',
        value: 'Times New Roman, serif'
    },
    {
        label: 'Georgia',
        value: 'Georgia, serif'
    },
    {
        label: 'Palatino Linotype',
        value: 'Palatino Linotype, Book Antiqua, Palatino, serif'
    },
    {
        label: 'Courier New',
        value: 'Courier New, monospace'
    },
    {
        label: 'Lucida Console',
        value: 'Lucida Console, monospace'
    },
    {
        label: 'Monaco',
        value: 'Monaco, monospace'
    },
    {
        label: 'Comic Sans MS',
        value: 'Comic Sans MS, cursive'
    },
    {
        label: 'Trebuchet MS',
        value: 'Trebuchet MS, sans-serif'
    },
    {
        label: 'Century Gothic',
        value: 'Century Gothic, sans-serif'
    },
    {
        label: 'Franklin Gothic Medium',
        value: 'Franklin Gothic Medium, sans-serif'
    },
    {
        label: 'Garamond',
        value: 'Garamond, serif'
    }
]

const editor = inject(EditorInstanceSymbol)

/**
 * 改变标题状态
 * @param value 当前选中的数据
 */
const change = (value: string) => {
    editor?.value?.chain().focus().setFontFamily(value).run()
}

/**
 * 当前显示的标题级别
 */
const currentShowLevel = computed(() => {
    const current = options.find(item =>
        editor?.value?.isActive('textStyle', { fontFamily: item.value })
    )
    return current ? current.value : '默认字体'
})

/**
 * 计算字体样式
 */
const computedFamily = (item: any) => {
    return {
        fontFamily: item.value
    }
}
</script>

<template>
    <ToolbarItem name="font-family" :use-active="false" title="字体">
        <f-select
            popper-class="heading"
            :options="options"
            v-model="currentShowLevel"
            :clearable="false"
            :style-formatter="computedFamily"
            @change="change"
        />
    </ToolbarItem>
</template>

<style lang="scss" scoped>
:deep(.el-select) {
    width: 80px !important;

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
