import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
import path from "path"
export default defineConfig({
  title: "基础组件文档",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/f-ui/",
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "基础组件文档",
    outline: {
      level: [2, 4],
      label: '页面导航'
    },
    socialLinks: [{ icon: "github", link: "" }],
    nav: [
      {
        text: "安装指南",
        link: "/components/"
      },
      { text: "基础组件", link: "/components/TInput/base.md" },
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
      "/components": [
        {
          text: "常用组件",
          items: [
            { text: "单选框组件", link: "/components/radio/" },
            { text: "复选框组件", link: "/components/checkbox/" },
            { text: "select组件", link: "/components/select/" },
          ]
        },
        {
          text: "复杂组件",
          items: [
            { text: "表单组件", link: "/components/form/" }
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
    theme: { light: "github-light", dark: "github-dark" },
    config: md => mdPlugin(md)
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../packages')
      }
    }
  }
})