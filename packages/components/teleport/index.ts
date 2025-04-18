import teleportComponent from './teleport-component'

import { withInstall } from '@/utils/vue/install'
import type { SFCWithInstall } from '@/utils/vue/install'

export const FTeleport: SFCWithInstall<typeof teleportComponent> = withInstall(teleportComponent)
export default FTeleport

export * from './teleport-component'