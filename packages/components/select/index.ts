import FSelect from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const ElementForm: SFCWithInstall<typeof FSelect> = withInstall(FSelect)
export default ElementForm