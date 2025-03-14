<script setup lang="ts">
import { computed, inject } from 'vue'
import { EditorInstanceSymbol } from '../editor'

interface Props {
    name: string
    title: string
    // 图标在图片中的位置
    iconPosition?: string

    // 是否使用active配置
    useActive?: boolean

    // 是否有效的判断依据
    active?: boolean

    /**
     *  是否有效判断
     */
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    useActive: true,
    disabled: false
})
const editor = inject(EditorInstanceSymbol)

/**
 * 对应样式是否有效
 */
const isActive = computed(() => {
    if (!props.useActive) {
        return false
    }

    return props.active != undefined ? props.active : editor?.value?.isActive(props.name)
})

</script>

<template>
    <div :class="['toolbar-item', name]">
        <el-tooltip
            :content="title"
            :disabled="title == undefined || title == ''"
            effect="light"
            placement="bottom"
            :show-after="1000"
        >
            <div :class="['button-body', isActive ? 'is-active' : '', disabled ? 'is-disabled' : '']">
                <slot>
                    <div class="button-icon" v-if="iconPosition" :style="{
                        backgroundPosition: iconPosition
                    }"></div>
                    <slot name="button-extra" />
                </slot>
            </div>
        </el-tooltip>
    </div>
</template>

<style lang="scss" scoped>
.toolbar-item {
    margin: 1px;
    height: 20px;

    .button-body {
        position: relative;
        padding: 1px;
        display: flex;
        align-items: center;

        &.is-disabled {
            opacity: 0.3;
        }

        &:not(.is-disabled):hover {
            position: relative;
            background-color: #fff5d4;
            border: 1px solid #dcac6c;
            padding: 0;
        }

        &.is-active {
            background-color: #ffe69f;
            padding: 0;
            border: 1px solid #dcac6c;
            border-radius: 2px;
        }

        .button-icon {
            height: 20px !important;
            width: 20px !important;
            background-image: url(../../images/icons.png);
        }
    }
}
</style>
