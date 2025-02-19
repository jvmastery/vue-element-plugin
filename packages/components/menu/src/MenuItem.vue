<script setup lang="ts">
import type { MenuItemProp } from './index'

const props = withDefaults(
    defineProps<{
        data: MenuItemProp
    }>(),
    {}
)
</script>

<template>
    <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.id">
        <template #title>{{ data.displayName }}</template>
        <MenuItem v-for="item in data.children" :key="item.id" :data="item" />
    </el-sub-menu>

    <el-menu-item v-else :index="data.id">{{ data.displayName }}</el-menu-item>
</template>
