import { type App } from 'vue'
import components from './component'
import { provideGlobalConfig } from './hooks/use-global-config'
import { PluginContext } from './types'
import { ClickOutside } from 'element-plus'

/**
 * vue插件
 * @param app
 */
const install = (app: App, options: PluginContext = {}) => {
    if (options.register !== false) {
        // 不注册全局组件
        components.forEach((c) => app.use(c))
    }

    if (options.request) {
        // 配置了拦截器
        options.requestInterceptors?.forEach((interceptor) => {
            options.request?.interceptors.request.use(interceptor);
        });
        options.responseInterceptors?.forEach((interceptor) => {
            options.request?.interceptors.response.use(interceptor);
        });

        // 将请求库挂载到全局
        app.config.globalProperties.$request = options.request;
    }

    provideGlobalConfig(options, app, true)
    installDirective(app)
}

/**
 * 注册插件
 */
const installDirective = (app: App) => {
    app.directive('click-outside', ClickOutside)
}
  

// 默认导出这个插件，供 `app.use()` 使用
export default {
    install
}

export * from '@/components'
export * from '@/hooks'
export * from '@/utils'
