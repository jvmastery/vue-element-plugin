// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.4_sass@1.80.4/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.8_vue@3.5.10/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/unplugin-vue-components@0.27.4_vue@3.5.10/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/unplugin-vue-components@0.27.4_vue@3.5.10/node_modules/unplugin-vue-components/dist/resolvers.js";
import dts from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.7.4_typescript@5.6.2_vite@5.4.8/node_modules/vite-plugin-dts/dist/index.mjs";
import viteCompression from "file:///E:/code/my/vue-element-plugin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.8/node_modules/vite-plugin-compression/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "E:\\code\\my\\vue-element-plugin";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      dts(),
      viteCompression({
        verbose: true,
        disable: false,
        // 不禁用压缩
        deleteOriginFile: false,
        // 压缩后是否删除原文件
        threshold: 10240,
        // 压缩前最小文件大小
        algorithm: "gzip",
        // 压缩算法
        ext: ".gz"
        // 文件类型
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./packages")
      }
    },
    build: {
      lib: {
        entry: resolve(__vite_injected_original_dirname, "packages/index.ts"),
        name: "VueElementPlugin",
        fileName: (format) => `vue-element-plugin.${format}.js`
      },
      rollupOptions: {
        // https://rollupjs.org/configuration-options/
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXG15XFxcXHZ1ZS1lbGVtZW50LXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxteVxcXFx2dWUtZWxlbWVudC1wbHVnaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvbXkvdnVlLWVsZW1lbnQtcGx1Z2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQ29uZmlnRW52LCBkZWZpbmVDb25maWcsIGxvYWRFbnYsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuXHJcbi8vIFx1NTIxQlx1NUVGQVx1N0M3Qlx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuLy8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1MzhCXHU3RjI5XHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nIFxyXG4vLyBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgdnVlKCksXHJcbiAgICAgICAgICAgIGR0cygpLFxyXG4gICAgICAgICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgdmVyYm9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGU6IGZhbHNlLCAvLyBcdTRFMERcdTc5ODFcdTc1MjhcdTUzOEJcdTdGMjlcclxuICAgICAgICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLCAvLyBcdTUzOEJcdTdGMjlcdTU0MEVcdTY2MkZcdTU0MjZcdTUyMjBcdTk2NjRcdTUzOUZcdTY1ODdcdTRFRjZcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNDAsIC8vIFx1NTM4Qlx1N0YyOVx1NTI0RFx1NjcwMFx1NUMwRlx1NjU4N1x1NEVGNlx1NTkyN1x1NUMwRlxyXG4gICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsIC8vIFx1NTM4Qlx1N0YyOVx1N0I5N1x1NkNENVxyXG4gICAgICAgICAgICAgICAgZXh0OiAnLmd6JywgLy8gXHU2NTg3XHU0RUY2XHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vcGFja2FnZXMnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2luZGV4LnRzJyksXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnVnVlRWxlbWVudFBsdWdpbicsXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGB2dWUtZWxlbWVudC1wbHVnaW4uJHtmb3JtYXR9LmpzYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL3JvbGx1cGpzLm9yZy9jb25maWd1cmF0aW9uLW9wdGlvbnMvXHJcbiAgICAgICAgICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTU5MTZcdTkwRThcdTUzMTZcdTU5MDRcdTc0MDZcdTkwQTNcdTRFOUJcdTRGNjBcdTRFMERcdTYwRjNcdTYyNTNcdTUzMDVcdThGREJcdTVFOTNcdTc2ODRcdTRGOURcdThENTZcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxyXG4gICAgICAgICAgICAgICAgLy8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcclxuICAgICAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnVlOiAnVnVlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixTQUFvQixjQUFjLGVBQTJCO0FBQzlVLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUdwQyxPQUFPLFNBQVM7QUFFaEIsT0FBTyxxQkFBcUI7QUFFNUIsU0FBUyxlQUFlO0FBWHhCLElBQU0sbUNBQW1DO0FBY3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUE2QjtBQUM3RCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBRXZDLFNBQU87QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLElBQUk7QUFBQSxNQUNKLGdCQUFnQjtBQUFBLFFBQ1osU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBO0FBQUEsUUFDVCxrQkFBa0I7QUFBQTtBQUFBLFFBQ2xCLFdBQVc7QUFBQTtBQUFBLFFBQ1gsV0FBVztBQUFBO0FBQUEsUUFDWCxLQUFLO0FBQUE7QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNQLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ3JDLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNQLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ3JDLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsS0FBSztBQUFBLFFBQ0QsT0FBTyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLFFBQzdDLE1BQU07QUFBQSxRQUNOLFVBQVUsWUFBVSxzQkFBc0IsTUFBTTtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLFFBR1gsVUFBVSxDQUFDLEtBQUs7QUFBQTtBQUFBLFFBRWhCLFFBQVE7QUFBQSxVQUNKLFNBQVM7QUFBQSxZQUNMLEtBQUs7QUFBQSxVQUNUO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
