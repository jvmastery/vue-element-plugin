import { useUpload } from "@/hooks/use-upload"
import { Editor } from "@tiptap/core"

/**
 * 上传文件
 * @param editor    当前编辑器 
 * @param file      待上传的文件
 */
export const uploadImage = (editor: Editor, file: File, pos?: number) => {
    // 记录当前文件位置
    const curentPosition = pos ?? editor.state.selection.anchor ?? 0
    editor
        .chain()
        .focus()
        .setImage({
            src: URL.createObjectURL(file),
            title: file.name,
            alt: file.name,
            dataProgress: 0,
            dataLoading: true
        })
        .run()

    useUpload(file, {
        onSuccess: (data) => {
            // 上传成功，更新数据
            const transaction = editor.state.tr.setNodeAttribute(
                curentPosition,
                'dataLoading',
                false
            )
            transaction?.setNodeAttribute(curentPosition, 'src', data.url)
            if (transaction) {
                editor.view.dispatch(transaction)
            }
        },
        onError: () => {
            // 上传失败，直接删除
            editor.chain()
                .deleteRange({ from: curentPosition, to: curentPosition + 1 })
                .run()
        },
        onProgress: data => {
            // 上传过程，更新状态
            const transaction = editor.state.tr.setNodeAttribute(
                curentPosition,
                'dataProgress',
                data.percent * 100
            )
            if (transaction) {
                editor.view.dispatch(transaction)
            }
        }
    })
}