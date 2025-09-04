<!-- 页面属性配置 -->
<template>
    {{ tableData }}
    <f-table
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        :options-buttons="tableOptions"
        :show-page="false"
        v-bind="$attrs"
        @row-dblclick="rowDblclick"
        v-click-outside="completeEdit"
    >
        <template v-for="column in computedFields" #[column.prop]="scope">
            <!-- 如果 C 定义了插槽，就直接透传，完全以 C 为准 -->
            <slot
                v-if="$slots[column.prop!]"
                :name="column.prop"
                v-bind="scope"
                :edit="scope.$index == currentEditIndex"
            ></slot>
            <!-- 如果 C 没定义插槽 -->
            <template v-else>
                <!-- 编辑态 -->
                <template v-if="scope.$index == currentEditIndex">
                    <component
                        :is="column.componentInstance"
                        v-model="scope.row[column.prop]"
                        v-bind="column.attrs"
                    />
                </template>
                <!-- 非编辑态，走 A 的默认展示 -->
                <!-- <slot v-else :name="column.prop" v-bind="scope"></slot> -->
                <template v-else>
                    <CellRender :column="column as TableColumn" :scope="scope" />
                </template>
            </template>
        </template>
        <template #empty>
            暂无数据，点击
            <span class="add-button" @click="addPageOption">添加</span>
        </template>
    </f-table>

    <el-row v-if="tableData?.length" justify="center" class="add-new">
        <el-link @click="addPageOption" type="primary">添加新属性</el-link>
    </el-row>
</template>

<script setup lang="ts">
import { Bottom, Delete, Top } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { ButtonOption, OptionData, TableColumn } from './table'
import { loadComponent } from '@/components/form'
import { CellRender } from './render'
import { useDefineModel, useThrottle } from '@/hooks'
import { ValidateResult } from '@/types'

defineOptions({
    name: 'FEditTable'
})

interface Prop {
    /**
     * 字段属性
     */
    columns: Partial<TableColumn>[]
    /**
     * 需要删除按钮
     */
    useDelete?: boolean
    /**
     * 需要上下移动按钮
     */
    useMove?: boolean
    /**
     * 自定义按钮组
     */
    options?: ButtonOption[]
}

/**
 * 删除按钮
 */
const DEFAULT_DELETE_BUTTON = {
    name: '删除',
    confirm: true,
    type: 'danger',
    icon: Delete,
    click: (data: OptionData) => {
        const index = data.index
        if (index == currentEditIndex.value) {
            currentEditIndex.value = undefined
        }

        tableData.value.splice(index as number, 1)
        tableRef.value.confirm()
    }
}

/**
 * 删除按钮
 */
const DEFAULT_MOVE_BUTTON = [
    {
        name: '上移',
        icon: Top,
        click: (data: OptionData) => {
            const index = data.index as number
            moveByIndex(tableData.value, index, index - 1)
        }
    },
    {
        name: '下移',
        icon: Bottom,
        click: (data: OptionData) => {
            const index = data.index as number
            moveByIndex(tableData.value, index, index + 1)
        }
    }
]

/**
 * 移动数组元素位置
 * @param arr 数组
 * @param fromIndex 移动位置
 * @param toIndex 移动后位置
 */
function moveByIndex(arr: any[], fromIndex: number, toIndex: number) {
    console.log(fromIndex)
    if (fromIndex < 0 || fromIndex >= arr.length) return arr
    if (toIndex < 0) toIndex = 0
    if (toIndex >= arr.length) toIndex = arr.length - 1

    const [item] = arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, item)
    tableRef.value.confirm()
    return arr
}

const props = withDefaults(defineProps<Prop>(), {
    useDelete: true,
    useMove: false
})
const tableRef = ref()
const tableData = useDefineModel([] as any[])
const currentEditIndex = ref()

/**
 * 自定义属性按钮
 */
const tableOptions = computed(() => {
    const options = []
    if (props.useMove) {
        options.push(...DEFAULT_MOVE_BUTTON)
    }

    if (props.options) {
        options.push(...props.options)
    }

    if (props.useDelete) {
        options.push(DEFAULT_DELETE_BUTTON)
    }

    return options
})

/**
 * 编辑页面属性
 */
const computedFields = computed(() => {
    return props.columns.map(field => {
        const { prop, label, width, type, attrs, ...others } = field
        const componentInstance = loadComponent(field.dataType)
        const isComponentInstance = 'options' in componentInstance

        const fieldOptions = {
            // 将一些组件外部使用属性隔离开，其他的属性传递给组件
            ...field,
            attrs: {
                ...(isComponentInstance ? componentInstance.options : {}),
                ...others,
                ...attrs
            },
            componentInstance: isComponentInstance ? componentInstance.comp : componentInstance
        }

        return fieldOptions
    })
})

/**
 * 添加页面属性
 */
function addPageOption() {
    if (!pageOptionIsWriteComplete()) {
        return
    }

    tableData.value.push({})
    currentEditIndex.value = tableData.value.length - 1

    tableRef.value.confirm()
}

/**
 * 判断当前属性行是否已经编辑完成
 */
function pageOptionIsWriteComplete() {
    const { isValid, field } = validate()
    if (isValid) {
        return true
    }

    ElMessage.warning(`请输入${field}`)
}

/**
 * 完成编辑
 */
const completeEdit = useThrottle(() => {
    const { isValid } = validate()
    if (isValid) {
        currentEditIndex.value = undefined
    }
})

/**
 * 双击行，进行编辑
 * @param row 行数据
 */
function rowDblclick(row: any) {
    const index = tableData.value.indexOf(row)
    if (currentEditIndex.value == index) {
        // 相同行，不处理
        return
    }

    if (!pageOptionIsWriteComplete()) {
        return
    }

    if (index > -1) {
        currentEditIndex.value = index
    }
}

/**
 * 数据验证
 */
function validate(): ValidateResult {
    if (currentEditIndex.value == undefined) {
        return {
            isValid: true
        }
    }

    const currentEditData = tableData.value[currentEditIndex.value]
    if (currentEditData == undefined) {
        return {
            isValid: true
        }
    }

    // 判断属性是否都填写了
    for (const item in props.columns) {
        const columnItem = props.columns[item]
        const columnItemValue = currentEditData[columnItem.prop!]
        const required = columnItem.required || false

        if (required && (columnItemValue == undefined || columnItemValue == '')) {
            return {
                isValid: false,
                field: columnItem.label,
                message: `第${currentEditIndex.value + 1}行${columnItem.label}不能为空`
            }
        }
    }

    return {
        isValid: true
    }
}

defineExpose({
    validate
})
</script>

<style lang="scss" scoped>
.add-button {
    color: blue;
    cursor: pointer;
}

.add-new {
    padding-top: 10px;
}
</style>
