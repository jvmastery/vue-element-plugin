/**
 * base64转换为文件
 * @param dataURL   
 * @returns 
 */
export const dataURLtoFile = (dataURL: string): Promise<File> => {
    return new Promise(resolve => {
        fetch(dataURL)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'image.png', { type: blob.type })
                resolve(file)
            })
    })
}
