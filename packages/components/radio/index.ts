import Radio from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const FRadio: SFCWithInstall<typeof Radio> = withInstall(Radio)
export default FRadio