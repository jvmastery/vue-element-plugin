// column-render.tsx
import { defineComponent, h, PropType, VNode } from 'vue'
import { ElTableColumn } from 'element-plus'
import type { TableColumn } from './table'
import CellRender from './cell-render'

export default defineComponent({
    name: 'ColumnRender',
    props: {
        columns: {
            type: Array as PropType<TableColumn[]>,
            required: true
        }
    },
    setup(props, { slots }) {
        const renderColumns = (columns: TableColumn[]): VNode[] => {
            return columns.map(item => {
                const { sortable, prop, children, ...columnProps } = item

                return h(
                    ElTableColumn,
                    {
                        key: String(item.index),
                        prop,
                        sortable: sortable ? 'custom' : false,
                        ...columnProps
                    },
                    {
                        // default 插槽 = 单元格渲染
                        default: (scope: any) =>
                            children
                                ? renderColumns(children) // 递归子列
                                : h(CellRender, { column: item, scope, slots }),
                        // header 插槽
                        header: slots[`${prop}-header`]
                            ? (scope: any) => slots[`${prop}-header`]!(scope)
                            : undefined
                    }
                )
            })
        }

        return (): VNode[] => renderColumns(props.columns)
    }
})
