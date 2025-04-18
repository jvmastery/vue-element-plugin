import Dialog from './src/dialog.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const FDialog: SFCWithInstall<typeof Dialog> = withInstall(Dialog)
export default FDialog

export * from './src/dialog'

// 组件实例
export type DialogInstance = InstanceType<typeof Dialog> 