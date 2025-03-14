<script setup lang="ts">
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { inject, ref } from 'vue'
import FForm from '@f-ui/components/form'

const editor = inject(EditorInstanceSymbol)
const dialogVisible = ref(false)
const formData = ref({
    href: '',
    target: ['_blank']
})
const fields = [
    {
        name: 'href',
        label: '链接地址'
    },
    {
        name: 'target',
        label: '是否在新窗口打开',
        labelWidth: '145px',
        type: 'checkbox',
        options: [
            {
                value: '_blank'
            }
        ]
    }
]


/**
 * 显示超链接输入框
 */
const click = () => {
    const link = editor?.value?.getAttributes('link')

    if (link && link.href) {
        formData.value.href = link.href
        formData.value.target = link.target ? [link.target] : []
    } else {
        formData.value.href = ''
        formData.value.target = ['_blank']
    }

    dialogVisible.value = true
}

/**
 * 输入数据
 */
const saveHref = () => {
    
    if (formData.value.href == '') {
        // 没有输入地址，取消
        editor?.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
        editor?.value
            ?.chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: formData.value.href, target: formData.value.target?.join(',') })
            .run()
    }
    dialogVisible.value = false
}
</script>

<template>
    <ToolbarItem name="link" title="超链接" icon-position="-500px 0" @click="click" />

    <el-dialog v-model="dialogVisible" title="超链接设置" width="400px">
        <f-form :fields="fields" v-model="formData" :col-size="1" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveHref">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
