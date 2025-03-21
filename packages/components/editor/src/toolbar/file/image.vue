<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
import { useUpload } from '@/hooks/use-upload'
import { uploadImage } from './upload'

const editor = inject(EditorInstanceSymbol)
const fileRef = ref()

/**
 * 选则文件
 */
const imageUpload = () => {
    fileRef.value.click()
}

/**
 * 上传文件
 * @param event
 */
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const files: FileList | null = input.files

    if (editor?.value == undefined) {
        return
    }

    if (files && files.length > 0) {
        const file: File = files[0]
        input.value = ''
        uploadImage(editor.value, file)
        // // 记录当前文件位置
        // const curentPosition = editor.value.state.selection.anchor ?? 0
        // editor.value
        //     .chain()
        //     .focus()
        //     .setImage({
        //         src: URL.createObjectURL(file),
        //         title: file.name,
        //         alt: file.name,
        //         dataProgress: 0,
        //         dataLoading: true
        //     })
        //     .run()

        // useUpload(file, {
        //     onSuccess: (data) => {
        //         // 上传成功，更新数据
        //         const transaction = editor.value?.state.tr.setNodeAttribute(
        //             curentPosition,
        //             'dataLoading',
        //             false
        //         )
        //         transaction?.setNodeAttribute(curentPosition, 'src', data.url)
        //         if (transaction) {
        //             editor.value?.view.dispatch(transaction)
        //         }
        //     },
        //     onError: () => {
        //         // 上传失败，直接删除
        //         editor.value
        //             ?.chain()
        //             .deleteRange({ from: curentPosition, to: curentPosition + 1 })
        //             .run()
        //     },
        //     onProgress: data => {
        //         // 上传过程，更新状态
        //         const transaction = editor.value?.state.tr.setNodeAttribute(
        //             curentPosition,
        //             'dataProgress',
        //             data.percent * 100
        //         )
        //         if (transaction) {
        //             editor.value?.view.dispatch(transaction)
        //         }
        //     }
        // })
    }
}
</script>

<template>
    <ToolbarItem
        name="image"
        title="图片上传"
        icon-position="-380px 0px"
        @click="imageUpload"
    ></ToolbarItem>
    <input ref="fileRef" type="file" accept="image/*" @change="handleFileChange" hidden />
</template>
