import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import { withInstall, withNoopInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

export const FMenu: SFCWithInstall<typeof Menu> & {
    MenuItem: typeof MenuItem
} = withInstall(Menu, {
    MenuItem
})
export default FMenu
export const FMenuItem: SFCWithInstall<typeof MenuItem> = withNoopInstall(MenuItem)

export * from './src/menu'
export * from './src/instance'