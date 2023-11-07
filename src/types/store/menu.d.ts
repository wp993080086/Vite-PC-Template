/**
 * @description 菜单模块
 */
export interface IMenuModules {
	isCollapse: boolean
	menuList: Array<IMenuItem>
}

export interface IMenuItem {
	title: string
	path: string
	icon?: string
	children?: Array<IMenuItem>
}
