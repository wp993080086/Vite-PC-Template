/// <reference types="vite/client" />

/**
 * @description vue文件类型
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, TAny>
	export default component
}

/**
 * @description ElementPlus 中文语言包
 */
declare module 'element-plus/dist/locale/zh-cn.mjs'
/**
 * @description ElementPlus 英文语言包
 */
declare module 'element-plus/dist/locale/en.mjs'
