<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import type { MenuItemProp } from './index.d.ts'

withDefaults(
    defineProps<{
        data: MenuItemProp[]
    }>(),
    {}
)
</script>

<template>
    <el-menu class="menu__wrapper" v-bind="$attrs">
        <MenuItem v-for="item in data" :key="item.id" :data="item" />
    </el-menu>
</template>
