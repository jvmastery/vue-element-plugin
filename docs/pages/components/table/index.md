# table组件
## 基础用法
通过指定`column`列表项来配置列表展示数据。
::: raw
:::demo 
components/table/base
:::

## 远程加载
通过设置`url`来远程调用数据，默认情况下列表页使用的请求方法为`GET`，如果需要改变，可通过`method`进行配置。

列表页返回数据格式必须包含records和total，其中records为当前分页的数据（array），total为数据总数。如果接口返回的格式和列表需要的格式不一致，需通过`on-load-success`方法对接口数据数据格式进行调整。

::: raw
:::demo
components/table/remote
:::

## 自定义空数据样式
通过`empty插槽`实现自定义。
::: raw
:::demo
components/table/empty
:::

## 定义按钮
按钮分为工具类按钮和操作栏按钮。使用`optionsButtons`和`toolButtons`来定义，按钮属性继承于element `Button` 按钮属性，然后通过`name`字段来定义按钮的名称，同时可通过`click`方法来定义按钮点击时触发的事件。传输数据格式：

```
interface OptionData {
    /**
     * 当前行数据
     */
    row?: AnyObject
    /**
     * 列信息
     */
    column?: AnyObject
    /**
     * 当前行号
     */
    $index?: Number
    /**
     * 按钮信息
     */
    options: ButtonOption
    /**
     * 选中行数据
     */
    selections: AnyObject[]
}
```
如果没有定义`click`属性，则可以通过`@buttonClick`来监听整体按钮点击事件。

::: raw
:::demo
components/table/buttons
:::

## 固定列
固定列需要使用在对应的column上设置`fixed`属性，当`fixed=true`时，列将被固定在左侧；同时，也接受传入字符串，left 或 right，表示左边固定还是右边固定。
::: raw
:::demo
components/table/fixed-column
:::

## 多级表头
在配置column时，如果需要设置多级表头，仅需在column的children下继续添加column即可。
::: raw
:::demo
components/table/more-header
:::

## 多选
添加`type=selection`属性，即可将表格设置为多选模式。type的值还可以是index：则显示该行的索引（从 1 开始计算）和  expand：则显示为一个可展开的按钮。
::: raw
:::demo
components/table/select
:::

## 排序
设置column的`sortable`属性，即可将对应字段变成排序字段。
::: raw
:::demo
components/table/sort
:::

## 搜索
设置column的`searchable`属性，即可将对应字段变成搜索条件。

同时可通过设置column的`type`属性，来定义搜索条件类型，默认情况下为文本输入框。当`type=daterange`时，是时间段；当`type=select`时，是下拉搜索框，此时需要设置对应的options属性。

当字段为搜索字段时，可以通过`searchDefault`来设定搜索字段的默认值。

::: raw
:::demo
components/table/search
:::

## 自定义列
自定义列的显示内容，可组合其他组件进行使用。
::: raw
:::demo
components/table/custom-column
:::

### 格式化内容
通过`formatter(row, column, cellValue, index）`函数可以直接格式化输出内容，从而改变表格现实的数据。见图片地址栏。

### 定义为图片
当column的`type=image`时，表明该字段需要以图片的形式进行展示，如果对应字段内容是数组，则以多图形式展示，否则是单图展示。这里如果定义了`wordSeperator`，则表名字段是多个地址拼接而成，会将字段以指定的分隔符分割成数组。见图片栏。

### 定义为地址
当column的`type=link`时，表明该字段需要以跳转地址的形式进行展示

### 定义为tag
当column的`type=tag`时，表明该字段需要以标签的形式进行展示。这时，如果设定了options，则会对地址内容进行格式化处理，会根据options中设定的value属性（可通过`optionsValue`来改变对应字段的名称）来匹配，匹配成功后，以label属性（可通过`optionsLabel`来改变对应字段的名称）进行展示。

并且，如果options中存在type，那么标签样式会以type样式（success/info/warning/danger）进行展示。

### 完全自定义
当默认定义的格式无法满足需要时，我们可以通过插槽的方式来指定对应字段的渲染方式。插槽名称即为对应的字段名称。传递的字段为 `{ row: any, column: any, $index: number }` 。

