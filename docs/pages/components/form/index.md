# 表单组件
## 基础用法
:::demo 最基础的表单包含各种输入表单项。
components/form/base
:::

## 设置每行显示的表单项
:::demo 默认情况下，每行显示2个表单项。
components/form/column-num
:::

:::demo 可以通过设置 `col-size` 全局设置每行显示的表单项。
components/form/column-num1
:::

如果需要每行显示2个表单项，但是某一行需要占据整行，此时可以通过 `field` 中的 `colspan` 来调整某一项占据的列数。

 `colspan` 表示的是当前项占据的列数，比如每行展示2列，那么此时将 `colspan` 设置为2，则表示占据一整行。

:::demo 
components/form/base
:::

## 表单验证
表单验证规则遵循https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C默认验证规则配置方式。
:::demo 
components/form/validator
:::

## 控制表单项显示和隐藏
通过 `vif` 属性来控制表单项是否显示隐藏，vif是一个函数，接收当前formData。 
:::demo 
components/form/show-field
:::

## 表单按钮事件
默认情况下，表单提供确认和重置2个按钮，可以通过配置调整默认的按钮。
:::demo 
components/form/submit-buttons
:::

| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| showCancelButton | 是否显示取消按钮 | boolean | false |
| cancelButtonText | 取消按钮的文本内容 | string | 取消 |
| cancelButtonType | 取消按钮的类型样式 | string | info |
| cancelButtonIcon | 定义取消按钮的图标 | string / Component | - |
| onCancel | 点击按钮响应事件 | Function | - |
| showResetButton | 是否显示重置按钮 | boolean | true |
| resetButtonText | 重置按钮的文本内容 | string | 重置 |
| resetButtonType | 重置按钮的类型样式 | string | - |
| resetButtonIcon | 定义重置按钮的图标 | string / Component | - |
| onReset | 点击按钮响应事件 | Function | - |
| showConfirmButton | 是否显示取消按钮 | boolean | true |
| confirmButtonText | 确认按钮的文本内容 | string | 确认 |
| confirmButtonType | 确认按钮的类型样式 | string | primary |
| confirmButtonIcon | 定义确认按钮的图标 | string / Component | - |
| onConfirm | 点击按钮响应事件 | Function | - |

对于确认按钮，当没有定义`onConfirm`事件时，如果定义了`url`，则默认会走远程请求配置。
| 属性| 说明 | 类型 | 默认值 |
|--|--|--| -- |
| url | 远程地址 | string | - |
| method | 请求方法 | GET、POST、PUT、DELETE | POST |
| onLoadSuccess | 请求完成后的回调，对返回数据进行处理 | Function | - |
| onBeforeLoad | 数据请求前的回调，对请求参数进行处理 | Function | - |

## 插槽
### label插槽
label插槽可以自定义label，插槽名称为：` 字段名称 + Label ` 。可以接收field和data属性。
### 内容插槽
内容插槽可以修改表单项的展示方式，插槽名称为 ` 字段名称 `，可以接收field和data属性。

:::demo 
components/form/slot
:::

### 按钮插槽
#### submit-button
`submit-button`是替换全部按钮，通过这个插槽，则不会再展示默认的确认等按钮。

#### extra-button
`extra-button`是在原有按钮的基础上，再加上其他按钮。