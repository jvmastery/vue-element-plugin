# 复选框组件
## 基础用法
:::demo 使用 `v-model` 绑定选中的值，使用 `options` 来定义复选框的选项数据。
components/radio/base
:::

## 默认值设置
设置默认值。
:::demo 
components/radio/default
:::

## 禁用状态
:::demo 设置多选框不可用状态。将对应选项数据的 `disabled` 属性设置为true。
components/radio/disable
:::

## 按钮样式
:::demo 设置 `type` 属性，将type设置为button即可。
components/radio/button
:::

## 带有边框
:::demo 设置 `border` 属性可以显示带有边框的多选框。
components/radio/border
:::

## 设置大小
:::demo 设置 `size` 属性调整多选框的大小，属性值有：large、small。
components/radio/size
:::

## 自定义数据属性
默认情况下， `options` 中数据的值，label代表显示字段，value代表值，可以通过自定义字段名称来达到修改的目的。 通过配置label和value来定义对应的属性。
:::demo 
components/radio/option-prop
:::

## 通过远程URL加载数据
通过设置 `url` 来加载远程数据（注意：需要先注入axios实例），默认情况下，请求方法采用的是 `GET` 请求，如果需要改变，可以通过 `method` 属性来调整。

使用远程加载数据时，在接口请求前可以通过 `on-before-load` 方法来定义接口需要的参数，该方法返回的是一个object，如果没有额外参数需求，可以直接在地址上进行添加。

在接口返回成功后，可以通过 `handleSuccess` 方法来调整接口返回后的数据。

:::demo 
components/radio/remote
:::

## 插槽
可以通过插槽来定义任意选项的渲染，其中插槽的名称为对应选项的值。
:::demo 
components/radio/slot
:::