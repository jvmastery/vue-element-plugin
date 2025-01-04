# 发布
https://github.com/wocwin/t-ui-plus/blob/master/packages/index.ts
- npm run build
- npm login
- npm publish

# 使用
## 1、引入依赖
npm install vue-element-plugin

## 2、使用
### 2.1 全局引入
```
import VueElementPlugin from 'vue-element-plugin'
const app = createApp(App)

app.use(VueElementPlugin)
```

### 按需引入
```
import { ElementForm } from 'vue-element-plugin'

```