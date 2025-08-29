import Cascader from './src/cascader.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const FCascader: SFCWithInstall<typeof Cascader> = withInstall(Cascader)
export default FCascader

export * from './src/cascader'
export type CascaderInstance = InstanceType<typeof Cascader> 