import type { Component, App } from 'vue'
import FCheckbox from './components/checkbox'
import FRadio from './components/radio'
import FSelect from './components/select'
import FForm from './components/form'
import FMenu from './components/menu'
import { setAxios } from './axiosInstance'

// 存储组件列表
const components: {
    [propName: string]: Component
} = {
    FForm,
    FCheckbox,
    FRadio,
    FSelect,
    FMenu
}

/**
 * 添加按需引入
 */
export {
    FForm,
    FCheckbox,
    FRadio,
    FSelect,
    FMenu
}

/**
 *  插件注册
 * @param app 
 */
export const installComponents = (app: App) => {
    for (const key in components) {
        app.component(key, components[key])
    }
}

/**
 * vue插件
 * @param app
 */
const install: any = (app: any, options: AnyObject = {}) => {
    installComponents(app)
    if (options.axios) {
        setAxios(options.axios)
    }
}

// 默认导出这个插件，供 `app.use()` 使用
export default {
    install
}
