import Menu from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const FMenu: SFCWithInstall<typeof Menu> = withInstall(Menu)
export default FMenu