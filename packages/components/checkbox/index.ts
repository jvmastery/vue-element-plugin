import Checkbox from './src/checkbox.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const FCheckbox: SFCWithInstall<typeof Checkbox> = withInstall(Checkbox)
export default FCheckbox

export * from './src/checkbox'
export type { CheckboxInstance } from './src/instance'