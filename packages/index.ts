import type { Component, App } from 'vue'
import FCheckbox from './components/checkbox'
import FRadio from './components/radio'
import FForm from './components/form'

// 存储组件列表
const components: {
    [propName: string]: Component
} = {
    FForm,
    FCheckbox,
    FRadio
}

/**
 * 添加按需引入
 */
export {
    FForm,
    FCheckbox,
    FRadio
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
const install: any = (app: any) => {
    installComponents(app)
}

// 默认导出这个插件，供 `app.use()` 使用
export default {
    install
}
