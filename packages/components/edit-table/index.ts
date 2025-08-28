import EditTable from '../table/src/edit-table.vue'
import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FEditTable: SFCWithInstall<typeof EditTable> = withInstall(EditTable)
export default FEditTable

export type EditTableInstance = InstanceType<typeof FEditTable> 