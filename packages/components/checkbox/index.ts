import CheckBox from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const FCheckbox: SFCWithInstall<typeof CheckBox> = withInstall(CheckBox)
export default FCheckbox