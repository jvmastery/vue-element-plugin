import Select from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const FSelect: SFCWithInstall<typeof Select> = withInstall(Select)
export default FSelect