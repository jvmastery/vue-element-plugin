<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'
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
