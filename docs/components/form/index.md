# 表单组件
## 基础用法
:::demo 最基础的表单包含各种输入表单项。
form/base
:::

## 设置每行显示的表单项
:::demo 默认情况下，每行显示2个表单项。
form/column-num
:::

:::demo 可以通过设置 `col-size` 全局设置每行显示的表单项。
form/column-num1
:::

如果需要每行显示2个表单项，但是某一行需要占据整行，此时可以通过 `field` 中的 `colspan` 来调整某一项占据的列数。

 `colspan` 表示的是当前项占据的列数，比如每行展示2列，那么此时将 `colspan` 设置为2，则表示占据一整行。

:::demo 
form/base
:::

## 表单验证
表单验证规则遵循https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C默认验证规则配置方式。
:::demo 
form/validator
:::

## 控制表单项显示和隐藏
通过 `vif` 属性来控制表单项是否显示隐藏，vif是一个函数，接收当前formData。 
:::demo 
form/show-field
:::

## 插槽
### label插槽
label插槽可以自定义label，插槽名称为：` 字段名称 + Label ` 。可以接收field和data属性。
### 内容插槽
内容插槽可以修改表单项的展示方式，插槽名称为 ` 字段名称 `，可以接收field和data属性。

:::demo 
form/slot
:::
