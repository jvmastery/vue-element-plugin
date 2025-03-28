import Table from './src/table.vue'
import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FTable: SFCWithInstall<typeof Table> = withInstall(Table)
export default FTable

export * from './src/table'
export type TableInstance = InstanceType<typeof Table> 