import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { IMenuModules } from '@/types/store/menu'

/**
 * @description 使用setup模式定义
 */
export const menuModule = defineStore('menu', () => {
	const data = reactive<IMenuModules>({
		isCollapse: false,
		menuList: [
			{
				title: '设备监控',
				path: '/device-monitor',
				icon: 'icon-jk'
			},
			{
				title: '任务管理',
				path: '1',
				icon: 'icon-rw',
				children: [
					{
						title: '安装管理',
						path: '/install-manage'
					},
					{
						title: '维修管理',
						path: '/repair-manage'
					}
				]
			},
			{
				title: '基础设置',
				path: '2',
				icon: 'icon-sz',
				children: [
					{
						title: '厂商管理',
						path: '/firm-manage'
					}
				]
			}
		]
	})
	/**
	 * @description 获取菜单收缩状态
	 */
	const getIsCollapse = () => {
		return data.isCollapse
	}
	/**
	 * @description 修改菜单收缩状态
	 */
	const changeIsCollapse = () => {
		data.isCollapse = !data.isCollapse
	}

	return {
		...toRefs(data),
		getIsCollapse,
		changeIsCollapse
	}
})
