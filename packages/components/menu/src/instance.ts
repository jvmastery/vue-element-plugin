import type Menu from './menu.vue'
import type MenuItem from './menu-item.vue'

// 组件实例
export type MenuInstance = InstanceType<typeof Menu> 
export type MenuItemInstance = InstanceType<typeof MenuItem> 