import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// 图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// 创建类声明文件
import dts from 'vite-plugin-dts'
// 静态资源压缩
import viteCompression from 'vite-plugin-compression' 
// 设置别名
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            vue(),
            nodePolyfills({
                include: ['crypto', 'util', 'stream']
            }),
            dts(),
            viteCompression({
                verbose: true,
                disable: false, // 不禁用压缩
                deleteOriginFile: false, // 压缩后是否删除原文件
                threshold: 10240, // 压缩前最小文件大小
                algorithm: 'gzip', // 压缩算法
                ext: '.gz', // 文件类型
            }),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ]
            }),
            Components({
                resolvers: [
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    ElementPlusResolver()
                ]
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './packages'),
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
        },
        build: {
            lib: {
                entry: resolve(__dirname, './packages/index.ts'),
                name: 'f-ui',
                fileName: format => `f-ui.${format}.js`
            },
            rollupOptions: {
                // https://rollupjs.org/configuration-options/
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', 'element-plus'],
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                output: {
                    globals: {
                        vue: 'Vue',
                        'element-plus': 'ElementPlus'
                    }
                }
            }
        }
    }
})
