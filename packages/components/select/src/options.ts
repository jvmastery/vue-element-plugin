/**
 * 生成动态选项组件
 */
import { defineComponent, h } from 'vue'

/**
 * 渲染选项
 */
const renderOption = (item, props) => {
    return h('el-option', {
        key: item[props.value],
        label: item.label,
        value: item[props.value]
    })
}

// 定义组件
export default defineComponent({
    name: 'DynamicOptions',
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            default: 'label'
        },
        value: {
            type: String,
            default: 'value'
        }
    },
    setup(props) {
        return () => {
            return props.options.map(group => {
                if (group.options) {
                    // 渲染分组
                    return h(
                        'el-option-group',
                        { label: group.label, key: group.label },
                        group.options.map(item => renderOption(item, props))
                    )
                }

                // 渲染非分组
                return renderOption(group, props)
            })
        }
    }
})
