// 对象工具类


export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends object>(arr: T) => Object.entries(arr)


