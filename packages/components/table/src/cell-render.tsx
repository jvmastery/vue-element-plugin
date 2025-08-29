// cell-render.tsx
import { defineComponent, h } from 'vue'
import { ElImage, ElTag } from 'element-plus'
import type { TableColumn } from './table'

export default defineComponent({
    name: 'CellRender',
    props: {
        column: Object as () => Partial<TableColumn>,
        scope: Object as () => any,
        slots: Object as () => Record<string, ((...args: any[]) => any) | undefined>
    },
    setup(props) {
        const renderCell = () => {
            const { column, scope, slots } = props
            if (!column || !scope) return null
            const { prop, type } = column
            if (prop == undefined) {
                // 没有对应字段，不处理
                return
            }

            // 1. 外部插槽优先
            if (slots?.[prop]) {
                return slots[prop]!(scope)
            }

            // 2. 类型渲染
            const getOptions = () => {
                if (!column.options) return
                return column.options.find(
                    optionItem => optionItem[column.optionsValue ?? 'value'] == scope.row[prop]
                )
            }

            switch (type) {
                case 'image': {
                    const images = Array.isArray(scope.row[prop])
                        ? scope.row[prop]
                        : column.wordSeperator
                          ? scope.row[prop]?.split(column.wordSeperator)
                          : [scope.row[prop]]

                    return images.filter(Boolean).map((src: string) =>
                        h(ElImage, {
                            src,
                            style: { ...column.attrs },
                            previewSrcList: images,
                            fit: 'cover'
                        })
                    )
                }
                case 'link':
                    return h(
                        'a',
                        { href: scope.row[prop], target: '_blank', style: 'color: blue;' },
                        scope.row[prop]
                    )
                case 'tag': {
                    const options = getOptions()
                    if (!options) {
                        return
                    }
                    return h(
                        ElTag,
                        { type: options?.type },
                        {
                            default: () =>
                                options ? options[column.optionsLabel ?? 'label'] : scope.row[prop]
                        }
                    )
                }
                case 'html': {
                    const value = scope.row[prop]
                    if (!value) {
                        return
                    }
                    return h('div', {
                        innerHTML: value
                    })
                }
                default:
                    function defaultRenderCell() {
                        if (column && column.formatter) {
                            return column.formatter(
                                scope.row,
                                scope.column,
                                scope.row[prop!],
                                scope.$index
                            ) ?? ''
                        }

                        return scope.row[prop!] ?? ''
                    }

                    return h('span', defaultRenderCell())
            }
        }

        return () => renderCell()
    }
})
