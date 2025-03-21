import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
    title: '基础组件文档',
    description: '基于Element-plus基础组件封装使用',
    lang: 'cn-ZH',
    base: '/f-ui/',
    lastUpdated: true,
    themeConfig: {
        logo: '/favicon.ico',
        siteTitle: '基础组件文档',
        outline: {
            level: [2, 4],
            label: '页面导航'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/jvmastery/vue-element-plugin' }],
        nav: [
            {
                text: '安装指南',
                link: '/pages/components/'
            },
            { text: '基础组件', link: '/pages/components/radio/' },
            { text: 'Hooks', link: '/pages/hooks/use-debounce/' }
            //   {
            //     text: "GitHub地址",
            //     link: "https://github.com/wocwin/t-ui-plus"
            //   },
            //   {
            //     text: "Gitee码云地址",
            //     link: "https://gitee.com/wocwin/t-ui-plus"
            //   },
            //   {
            //     text: "博客",
            //     items: [
            //       { text: "CSDN", link: "https://blog.csdn.net/cwin8951" },
            //       {
            //         text: "掘金",
            //         link: "https://juejin.cn/user/888061128344087/posts"
            //       }
            //     ]
            //   }
        ],
        sidebar: {
            '/pages/components': [
                {
                    text: '常用组件',
                    items: [
                        { text: '单选框组件', link: '/pages/components/radio/' },
                        { text: '复选框组件', link: '/pages/components/checkbox/' },
                        { text: 'select组件', link: '/pages/components/select/' },
                        { text: '富文本编辑器', link: '/pages/components/editor/' }
                    ]
                },
                {
                    text: '复杂组件',
                    items: [{ text: '表单组件', link: '/pages/components/form/' }]
                }
            ],
            '/pages/hooks': [
                {
                    text: '常用函数',
                    items: [
                        { text: 'useDebounce', link: '/pages/hooks/use-debounce/' },
                        { text: 'useThrottle', link: '/pages/hooks/use-throttle/' },
                        { text: 'useTimeout', link: '/pages/hooks/use-timeout/' }
                    ]
                }
            ]
        }
    },
    markdown: {
        headers: {
            level: [0, 0]
        },
        // light: #f9fafb, dark: --vp-code-block-bg
        theme: { light: 'github-light', dark: 'github-dark' },
        config: md => mdPlugin(md)
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern'
                }
            }
        },
        plugins: [
            nodePolyfills({
                include: ['crypto', 'util', 'stream']
            }) as any
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../../packages'),
                '@f-ui': path.resolve(__dirname, '../../packages'),
                os: 'os-browserify/browser'
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
