# 发布
https://github.com/wocwin/t-ui-plus/blob/master/packages/index.ts
- npm run build
- npm login
- npm publish

# 使用
## 1、引入依赖
npm install @jvmaster/f-ui

## 2、使用
### 2.1 全局引入
```
import VueElementPlugin from '@jvmaster/f-ui'
const app = createApp(App)

app.use(VueElementPlugin)
```

### 按需引入
```
import { ElementForm } from '@jvmaster/f-ui'

```