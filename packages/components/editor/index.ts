import Editor from './src/editor.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const FEditor: SFCWithInstall<typeof Editor> = withInstall(Editor)
export default Editor

export type { EditorInstance } from './src/instance'