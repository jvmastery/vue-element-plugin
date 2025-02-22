<script setup lang="ts">
import MenuItem from './menu-item.vue'
import type { MenuItemProp } from './menu'

defineOptions({
    name: 'FMenu'
})

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
