# useThrottle
用来处理节流的 Hook。单位时间内只会执行一次。

## 基础用法
:::demo
hooks/use-throttle/base
:::

## API
```js
const throttle = useThrottle(func, interval, options)
```

### 属性值
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| func | 节流函数 | `Function`  | - |
| interval | 函数间隔时间 | `number` | - |
| options | 配置属性 | `options` | - |

### DebounceOptions
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| leading | 是否在延迟开始前调用函数 | `boolean` | true |
| trailing | 是否在延迟开始后调用函数 | `boolean` | true |