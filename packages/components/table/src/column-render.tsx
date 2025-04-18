// 渲染el-table-column
import { defineComponent, h, PropType, VNode } from 'vue'
import { ElImage, ElTableColumn, ElTag } from 'element-plus'
import { TableColumn } from './table'

export default defineComponent({
    props: {
        columns: {
            type: Array as PropType<TableColumn[]>,
            required: true
        }
    },
    setup(props, { slots }) {
        const renderColumns = (columns: TableColumn[]): VNode[] => {
            return columns.map(item => {
                const { sortable, prop, type, ...columnProps } = item

                /**
                 * 获取当前选项配置值
                 */
                const getOptions = (scope: any) => {
                    if (item.options == undefined) {
                        return
                    }

                    // 找到对应的value数据
                    const result = item.options.find(
                        optionItem => optionItem[item.optionsValue ?? 'value'] == scope.row[prop]
                    )
                    return result
                }

                // 处理 default 插槽
                const getDefaultSlot = (scope: any) => {
                    // 1. 优先递归渲染子列
                    if (item.children) {
                        return renderColumns(item.children)
                    }

                    // 2. 使用外部插槽
                    if (slots[prop]) {
                        return slots[prop]!(scope)
                    }

                    // 3. 根据 type 处理默认插槽渲染逻辑
                    switch (type) {
                        case 'image':
                            // 图片展示
                            const images = Array.isArray(scope.row[prop])
                                ? scope.row[prop]
                                : item.wordSeperator
                                  ? scope.row[prop].split(item.wordSeperator)
                                  : [scope.row[prop]]
                            return images.map((src: string) =>  h(ElImage, {
                                    src: src,
                                    style: {
                                        ...item.attrs,
                                        __src: src
                                    },
                                    previewSrcList: images,
                                    fit: 'cover'
                                })
                            )
                        case 'link':
                            // url跳转地址
                            return h(
                                'a',
                                { href: scope.row[prop], target: '_blank', style: 'color: blue;' },
                                scope.row[prop]
                            )
                        case 'tag':
                            // 标签，如果配置了options，则需要根据options配置的值进行结构
                            const options = getOptions(scope)
                            return h(
                                ElTag,
                                {
                                    type: options?.type
                                },
                                {
                                    default: () => options
                                        ? options[item.optionsLabel ?? 'label']
                                        : scope.row[prop]
                                }
                            )
                        default:
                            return undefined
                    }
                }

                
                return h(
                    ElTableColumn,
                    {
                        key: String(item.index),
                        prop: prop,
                        sortable: sortable ? 'custom' : false,
                        ...columnProps
                    },
                    {
                        // 优先透传单元格插槽，然后如果存在子列，则递归渲染子列
                        default: getDefaultSlot,
                        // 透传表头插槽
                        header: slots[`${prop}-header`]
                            ? (scope: any) => slots[`${prop}-header`]!(scope)
                            : undefined
                    }
                    // item.children ? () => renderColumns(item.children) : undefined
                )
            })
        }

        return (): VNode[] => renderColumns(props.columns)
    }
})
