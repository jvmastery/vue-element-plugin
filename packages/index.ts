import type { App } from 'vue'
import { setAxios } from './axiosInstance'
import components from './component'

/**
 * vue插件
 * @param app
 */
const install = (app: App, options: AnyObject = {}) => {
    components.forEach((c) => app.use(c))
    if (options.axios) {
        setAxios(options.axios)
    }
}

// 默认导出这个插件，供 `app.use()` 使用
export default {
    install
}

export * from '@/components'
// export * from '@/hooks'
