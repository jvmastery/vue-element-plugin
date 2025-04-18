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

const chunk_packages = [{
    name: 'tiptap',
    rename: 'editor'
}, 'highlight']

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
                ext: '.gz' // 文件类型
            }),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon'
                    })
                ]
            }),
            Components({
                resolvers: [
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep']
                    }),
                    ElementPlusResolver()
                ]
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './packages')
            }
        },
        server: {
            port: 5170,
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        build: {
            target: 'esnext', // 目标环境，支持最新 ES 语法
            minify: 'terser', // 使用 Terser 进行更强的 JS 压缩，需要安装terser依赖
            terserOptions: {
                compress: {
                    dead_code: true, // 移除未使用的变量
                    drop_console: false, // 保留 console.log
                    drop_debugger: true, // 移除 debugger
                    keep_classnames: false, // 允许混淆类名
                    keep_fnames: false // 允许混淆函数名
                },
                format: {
                    comments: false // 移除所有注释
                }
            },
            cssMinify: 'lightningcss', // 使用 LightningCSS 进行 CSS 压缩（比默认更快），需要安装lightningcss依赖
            cssCodeSplit: true, // 开启 CSS 代码拆分
            assetsInlineLimit: 4096, // 4kb 以下的资源转换为 base64
            sourcemap: false, // 生产环境关闭 source map
            chunkSizeWarningLimit: 500, // 触发 chunk 体积警告的大小
            lib: {
                entry: resolve(__dirname, './packages/index.ts'),
                name: 'f-ui',
                fileName: format => `f-ui.${format}.js`,
                // 拆分下代码，不能用umd格式
                formats: ['es', 'cjs']
            },
            rollupOptions: {
                // https://rollupjs.org/configuration-options/
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', 'element-plus', /^element-plus\//, 'qiniu-js'],
                output: {
                    globals: {
                        vue: 'Vue',
                        'element-plus': 'ElementPlus'
                    },
                    manualChunks(id) {
                        // 代码分割，将 vue、element-plus、node_modules 单独拆分
                        if (id.includes('node_modules')) {
                            for (const module of chunk_packages) {
                                const isString = typeof module === 'string'
                                if (id.includes(isString ? module : module.name)) {
                                    return isString ? module : module.rename
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
