// 导出所有组件
import { FCheckbox } from './components/checkbox'
import { FForm } from './components/form'
import { FMenu } from './components/menu'
import { FRadio } from './components/radio'
import { FSelect } from './components/select'
 
import { Plugin } from 'vue'

export default [
    FCheckbox,
    FForm,
    FMenu,
    FRadio,
    FSelect
] as Plugin[]