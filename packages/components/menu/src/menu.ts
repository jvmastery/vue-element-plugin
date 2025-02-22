export interface MenuItemProp {
    /**
     * 主键
     */
    id: string
    /**
     * 父菜单ID
     */
    parentId?: string
    /**
     * 标识
     */
    name: string
    /**
     * 显示名称
     */
    displayName: string
    /**
     * 子菜单
     */
    children?: MenuItemProp[]
}
