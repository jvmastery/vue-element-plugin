<!-- 选则 -->
<script setup lang="ts">

interface Option {
    value: string
    label: string
}

defineProps<{
    options: Option[]
}>()

const currentSelected = defineModel()

/**
 * 改变选则
 */
const changeSelect = (option: Option) => {
    currentSelected.value = option.value
}
</script>

<template>
    <div class="picker-container">
        <template v-for="item in options">
            <div class="menu-item" @click="changeSelect(item)">
                <div class="check-status">{{ currentSelected == item.value ? '√' : '' }}</div>
                <div class="content">
                    {{ item.label }}
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.picker-container {
    .menu-item {
        display: flex;

        .check-status {
            width: 20px;
            border-right: 1px solid #d2d2d2;
        }

        .content {
            padding-left: 8px;
        }
    }
}
</style>