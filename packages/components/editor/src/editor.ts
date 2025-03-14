import { Editor } from "@tiptap/vue-3"
import { InjectionKey, ShallowRef } from "vue"

export const EditorInstanceSymbol = Symbol() as InjectionKey<ShallowRef<Editor | undefined>>