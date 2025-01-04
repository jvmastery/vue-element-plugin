import Form from './src/index.vue'
import { withInstall } from '../../utils/vue/install'
import type { SFCWithInstall } from '../../utils/vue/install'

const FForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default FForm