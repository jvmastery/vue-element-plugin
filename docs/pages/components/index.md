# 使用
## 安装
::: code-group
```sh [pnpm]
pnpm add @jvmaster/f-ui
```

```sh [npm]
npm install @jvmaster/f-ui -S
```
:::

## 使用
### 全局引入
```
import Fui from '@jvmaster/f-ui'
const app = createApp(App, options: PluginContext)

app.use(Fui)
```

### 按需引入
```
import { FForm } from '@jvmaster/f-ui'

```

## 自定义PluginContext配置
```
export interface PluginContext {
    // 请求库
    request?: AxiosInstance
    // 请求配置信息
    uploadConfig?: UploadConfig
}
```
### request
设置全局请求库，目前暂时用的是axios，配置了请求库后，可以实现内部一些服务端请求逻辑。

### uploadConfig
设置文件上传配置，定义上传方式。文件上传功能需要`先配置request`。
```
export interface UploadConfig {
    /**
     * 文件上传类型
     * direct： 通过接口传到服务端，默认
     * qiniu： 上传到七牛云oss
     */
    type?: 'direct' | 'qiniu'
    /**
     * 服务端接口文件地址
     */
    url?: string
    /**
     * 指定文件上传地址前缀，（七牛云）
     */
    rootPath?: string
    /**
     * 分块上传文件大小，如果配置了，当文件大小超过该大小时，使用分开上传
     * 最小 4M 
     */
    blockedUploadSize?: number
    /**
     * 设置服务端token的提供url地址
     */
    tokenProviderUrl?: string
    /**
     * 对服务端提供的token进行格式化处理
     * @param any 
     * @returns 
     */
    tokenFormtter?: (...args: any[]) => UploadTokenResponse
    /**
     * oss文件域名前缀
     */
    host?: string,
    /**
     * 获取授权的accessKey。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    accessKey?: string
    /**
     * 获取授权的secretKey。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    secretKey?: string
    /**
     * 文件存储对应的bucket。为了安全，最好使用tokenProviderUrl从服务端进行获取
     */
    bucket?: string
}
```
这里文件上传分为多种方式：
#### 传到服务端配置
当`type='direct'（默认）`时，表示的是将文件上传通过接口直接传到服务端进行处理，此时需要配置`服务端接口文件地址url`，文件上传完成后，需要返回指定的响应结果（json），json格式为：
```
{
    path: '文件路径',
    url: '完整路径，包含域名'
}
```

#### 传到七牛云oss配置
当`type='qiniu'`时，表示的是传到七牛云oss，此时需要按照以下几步进行操作：
- 安装依赖  
通过`npm install qiniu-js`方法安装七牛云的前端依赖。

- 配置token获取方式  
配置七牛云鉴权操作，鉴权操作有2种方式，一种是**服务端接口获取（推荐）**，另一种是前端直接生成（测试时可使用，正式环境为了保证安全性，慎用！！！）。  
1、服务端获取（推荐）  
通过配置`tokenProviderUrl`设置服务端获取token接口地址。此时可以通过配合`tokenFormtter`来格式化接口获取到的数据，返回需要格式的token格式。
```
export interface UploadTokenResponse {
    /**
     * 构建的token
     */
    token: string
    /**
     * 有效期，单位：秒
     */
    expire: number
    /**
     * 地址域名
     */
    host: string
}
```
2、前端配置
配置`host`，`accessKey`, `secretKey`, `bucket`后即可。

#### 上传功能
配置完成后，可使用上传功能。
```
import { useUpload } from "@/hooks/use-upload"

useUpload(file: File, {
    onSuccess: (data) => {
        // 上传成功，更新数据
    },
    onError: () => {
        // 上传失败
    },
    onProgress: data => {
        // 上传过程，更新状态
    }
})
```
