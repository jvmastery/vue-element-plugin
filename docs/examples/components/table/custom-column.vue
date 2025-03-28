<script setup lang="ts">
const columns = [
    {
        label: '名称',
        prop: 'name',
        align: 'center',
        width: 100
    },
    {
        label: '图片',
        prop: 'url',
        type: 'image',
        align: 'center',
        width: 220,
        attrs: {
            // 可设定图片属性，如果没有设置，会以width来限定宽度，高度等比自适应
            width: '80px',
            height: '80px'
        }
    },
    {
        label: '图片地址',
        prop: 'urladdress',
        formatter: (row: any) => {
            return row.url
        }
    },
    {
        label: '日期',
        prop: 'date',
        align: 'center',
        width: 150
    },
    {
        label: '状态',
        prop: 'status',
        type: 'tag',
        searchable: true,
        options: [
            {
                label: '正常',
                value: 0,
                type: 'primary'
            },
            {
                label: '确认',
                value: 1,
                type: 'success'
            },
            {
                label: '待审核',
                value: 2,
                type: 'warning'
            },
            {
                label: '拒绝',
                value: 3,
                type: 'danger'
            }
        ]
    },
    {
        label: '地址',
        prop: 'address'
    }
]

const tableData: any[] = []
for (let i = 1; i < 22; i++) {
    tableData.push({
        date: '2025-01-' + (i < 10 ? '0' + i : i),
        name: 'name' + i,
        address: '地址信息s',
        url:
            i == 1
                ? [
                      'http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280',
                      'http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280'
                  ]
                : 'http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280',
        status: i % 4
    })
}
</script>

<template>
    <f-table :columns="columns" :data="tableData" height="300px">
        <template #name="{ row }">
            <span style="color: red">{{ row.name }}（自定义）</span>
        </template>
    </f-table>
</template>
