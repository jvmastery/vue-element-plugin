import Select from './src/select.vue'
import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FSelect: SFCWithInstall<typeof Select> = withInstall(Select)
export default FSelect

export * from './src/select'
export type { SelectInstance } from './src/instance'