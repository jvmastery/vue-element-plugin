import Radio from './src/radio.vue'
import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FRadio: SFCWithInstall<typeof Radio> = withInstall(Radio)
export default FRadio

export * from './src/radio'
export type { RadioInstance } from './src/instance'