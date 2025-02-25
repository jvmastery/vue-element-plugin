# useDebounce
用来处理防抖值的 Hook。

## 基础用法
:::demo
hooks/use-debounce/base
:::

## API
```js
const debounce = useDebounce(
    function, 
    options?: DebounceOptions
)

// 直接对响应式数据进行处理
const debounceValue1 = useDataDebounce(value)
```

### 属性值
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| value | 防抖数据 | `Function`  | - |
| options | 配置属性 | `DebounceOptions` | - |

### DebounceOptions
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| wait | 等待时间，毫秒 | `number` | 500 |
| immediate | 是否立即执行 | `boolean` | - |