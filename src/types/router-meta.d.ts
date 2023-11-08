/**
 * @description 扩展ruoter-meta的类型 此处必须要export {} 不然找不到类型
 */
declare module 'vue-router' {
	interface RouteMeta {
		permission?: Array<string>
		title?: string
		icon?: string
		affix?: boolean
		hidden?: boolean
		keepAlive?: boolean
	}
}

export {}
