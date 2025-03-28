import FCheckbox from './dist/components/checkbox/src/index.vue'
import FRadio from './dist/components/radio/src/index.vue'
import FSelect from './dist/components/select/src/index.vue'
import FForm from './dist/components/form/src/index.vue'
import FMenu from './dist/components/menu/src/index.vue'
import FEditor from './dist/components/editor/src/index.vue'
import FTable from './dist/components/table/src/index.vue'

// GlobalComponents for Volar
declare module 'vue' {
    export interface GlobalComponents {
        FCheckbox: typeof FCheckbox
        FRadio: typeof FRadio
        FSelect: typeof FSelect
        FForm: typeof FForm
        FMenu: typeof FMenu
        FEditor: typeof FEditor
        FTable: typeof FTable
    }
}

