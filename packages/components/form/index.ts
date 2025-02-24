import Form from './src/form.vue'
import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default FForm

export * from './src/form'
export type { FormInstance } from './src/instance'