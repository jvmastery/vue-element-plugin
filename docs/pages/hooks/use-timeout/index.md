# useDebounce
用来处理防抖值的 Hook。

## 基础用法
:::demo
hooks/use-timeout/base
:::

## API
```js
const { start, stop, timeoutHandle } = useTimeout()

start(() => {
    value.value = 100
}, 3000)
```

### 函数
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| start | 启动定时器 | `(fn: (...args: any[]) => any, delay: number) => void`  | - |
| clear | 清除定时器 | `() => void` | - |

### 属性值
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| fn | 待执行函数逻辑 | `Function`  | - |
| delay | 等待时间，单位：毫秒 | `number` | - |
| timeoutHandle | 定时器标识 | `number` | - |
