import DefaultTheme from "vitepress/theme"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"

// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { VPDemo } from "../vitepress"

// 基于element-plus二次封装基础组件
import Fui from "../../../packages"
import './style.scss'

// axios实例
import axios from 'axios'
import { setAxios } from '../../../packages/axiosInstance'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(Fui, {
      request: axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 5000
      }),
      uploadConfig: {
        rootPath: 'upload',
        accessKey: 'oscRVRGynjjHn47hYvLAf6jN_qdaldBF7Idz7Srr',
        secretKey: 'OeUPQG4QxQvmP8S6Qs6AvNKmCz8NU2ZplnXzJLZa',
        bucket: 'test-editor001'
      }
    })
    // setAxios(axios)

    // rootPath: 'upload',
    //     accessKey: 'oscRVRGynjjHn47hYvLAf6jN_qdaldBF7Idz7Srr',
    //     secretKey: 'OeUPQG4QxQvmP8S6Qs6AvNKmCz8NU2ZplnXzJLZa',
    //     bucket: 'test-editor001'

    ctx.app.component("Demo", VPDemo)
  }
}

axios.interceptors.response.use(
  response => {
      console.log(response);
      return response.data
  },
  error => {
      return Promise.reject(error)
  }
)
