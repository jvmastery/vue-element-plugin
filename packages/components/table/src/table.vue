<script setup lang="ts">
import { computed, onMounted, ref, useSlots } from 'vue'
import { tableProps } from './table'
import FForm from '@/components/form'
import { AnyObject } from '@/types'
import { Search } from '@element-plus/icons-vue'
import { useRequest } from '@/hooks'
import columnRender from './column-render'
import { TableInstance } from 'element-plus'
import { convertArrayToObject, isBetween } from '@/utils'

defineOptions({
    name: 'FTable'
})

const tableInstance = ref<TableInstance>()
const props = defineProps(tableProps)
const currentPage = ref(1)
const pageSize = ref(props.pageSizes ? props.pageSizes[0] : 10)

// 数据
const searchColumnFields = props.columns?.filter(item => item.searchable)
const columnFieldMap = convertArrayToObject(searchColumnFields, 'prop')
const searchData = ref<AnyObject>(convertArrayToObject(searchColumnFields, 'prop', 'searchDefault'))

const slots = useSlots()
const tableData = ref<AnyObject[]>([])
const totalCount = ref(0)
const sortField = ref<AnyObject>({
    prop: undefined,
    order: undefined
})

onMounted(() => {
    confirm()
})

/**
 * 构建搜索内容
 */
const searchFields = computed(() => {
    return searchColumnFields?.map(item => {
        return {
            name: item.prop,
            label: item.label,
            // 当为标签选项时，搜索为下拉选择
            type: item.type && item.type == 'tag' ? 'select' : item.type,
            attrs: item.attrs,
            options: item.options
        }
    })
})

/**
 * 是否使用远程接口加载数据
 *
 * 以定义的远程接口地址为标准，如果有地址，则默认为使用远程方式
 */
const useRemoteData = computed(() => {
    return props.url
})

/**
 * 请求远程数据
 */
const requestRemoteData = () => {
    const requestParams = {
        ...searchData.value,
        ps: pageSize.value,
        pn: currentPage.value,
        sortField: undefined,
        sortOrder: undefined
    }

    // 排序功能
    if (useSort()) {
        requestParams.sortField = sortField.value.prop
        requestParams.sortOrder = sortField.value.order
    }

    return useRequest(
        props.url!,
        {
            method: props.method,
            params: requestParams
        },
        props.onBeforeLoad,
        props.onLoadSuccess
    ).then(resp => {
        tableData.value = resp.records
        totalCount.value = resp.total
    })
}

/**
 * 改变分页时，重新请求数据
 */
const changePage = () => {
    if (useRemoteData.value) {
        requestRemoteData()
    }
}

/**
 * 判断是否使用排序功能
 */
const useSort = () => {
    return (
        sortField.value &&
        sortField.value.order != null &&
        sortField.value.order != undefined &&
        sortField.value.prop != undefined
    )
}

/**
 * 当前页显示的数据
 */
const currentPageData = computed(() => {
    if (useRemoteData.value) {
        return tableData.value
    }

    if (tableData.value == undefined) {
        return []
    }

    const currentData = useSort()
        ? [...tableData.value].sort((a, b) => {
              const fieldName = sortField.value.prop
              const order = sortField.value.order

              if (a[fieldName] < b[fieldName]) return order == 'descending' ? 1 : -1
              if (a[fieldName] > b[fieldName]) return order == 'descending' ? -1 : 1

              return 0
          })
        : tableData.value
    return currentData?.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value
    )
})

/**
 * 确认搜索
 * @param data 请求参数
 */
const confirm = () => {
    if (useRemoteData.value) {
        return requestRemoteData()
    }

    const filterData = props.data?.filter(item => {
        let match = true
        for (const [key, searchDataValue] of Object.entries(searchData.value)) {
            if (searchDataValue == undefined) {
                continue
            }

            const dataValue = item[key]
            const field = columnFieldMap[key]

            if (field.type == 'daterange') {
                // 时间分区
                if (!isBetween(dataValue, searchDataValue[0], searchDataValue[1])) {
                    return false
                }
            } else if (field.type == 'select' || field.type == 'tag') {
                if (item[key] != searchData.value[key]) {
                    return
                }
            } else {
                if (String(item[key]).indexOf(searchData.value[key]) == -1) {
                    return false
                }
            }
        }

        return match
    })

    tableData.value = filterData ?? []
    totalCount.value = filterData?.length ?? 0
}

/**
 * 监听排序功能
 * @param data 当前设置的排序字符串
 */
const sortChange = (data: AnyObject) => {
    sortField.value = data
}

defineExpose({
    tableInstance
})
</script>

<template>
    <div class="table__container">
        <slot name="search" :fields="searchFields">
            <f-form
                class="search__wrapper"
                :fields="searchFields"
                v-model="searchData"
                inline
                :on-confirm="confirm"
                :show-reset-button="false"
                confirm-button-text="查询"
                :confirm-button-icon="Search"
            />
        </slot>

        <el-table
            ref="tableInstance"
            class="table__wrapper"
            :data="currentPageData"
            @sort-change="sortChange"
            :stripe="stripe"
            :border="border"
            v-bind="$attrs"
        >
            <el-table-column v-if="type" :type="type" align="center"></el-table-column>
            <columnRender v-if="columns" :columns="columns">
                <!-- 透传所有插槽 -->
                <template v-for="(_, name) in slots" #[name]="scope">
                    <slot :name="name" v-bind="scope"></slot>
                </template>
            </columnRender>
            <template #empty>
                <slot name="empty">
                    <el-empty description="暂无数据" />
                </slot>
            </template>
        </el-table>

        <div class="page__wrapper" v-if="showPage && totalCount > 0">
            <div class="info ellipsis">
                显示第 {{ (currentPage - 1) * pageSize + 1 }} 到第
                {{ currentPage * pageSize }} 条记录，总共 {{ totalCount }} 条记录
            </div>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="pageSizes"
                :background="pageBackgroud"
                :layout="pageLayout"
                :total="totalCount"
                @change="changePage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/scss/index.scss';

.table__container {
    .table__wrapper {
        border-radius: 3px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

        :deep(.el-table__header-wrapper) {
            thead {
                &:not(.is-group) {
                    th {
                        background: linear-gradient(180deg, #f3f3f3, #e7e7e7);
                        box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.05);
                    }
                }

                th {
                    color: #444;
                    font-weight: bold;
                    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
                }
            }

            
        }

        :deep(.el-table__body-wrapper) {
            .el-image:not(:first-child) {
                padding-left: 10px;
            }
        }
    }

    .page__wrapper {
        margin-top: 20px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: auto;

        .info {
            color: #606266;
            font-size: 14px;
            min-width: 100px;
            margin-right: 20px;
        }
    }
}
</style>
