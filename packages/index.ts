import { inject, type App } from 'vue'
import components from './component'
import type { AxiosInstance } from 'axios'
import { PluginContext } from './constants'
import { provideGlobalConfig } from './hooks/use-global-config'

/**
 * vue插件
 * @param app
 */
const install = (app: App, options: PluginContext = {}) => {
    components.forEach((c) => app.use(c))

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
}
  

// 默认导出这个插件，供 `app.use()` 使用
export default {
    install
}

export * from '@/components'
export * from '@/hooks'
