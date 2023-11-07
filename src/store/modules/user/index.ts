import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { IUserModules, IUserInfo } from '@/types/store/user'

/**
 * @description 使用setup模式定义
 */
export const userModule = defineStore('user', () => {
	const data = reactive<IUserModules>({
		userInfo: {
			admin: 0,
			portrait: 'https://profile-avatar.csdnimg.cn/1101177910a34428b5d4b99993afe5bc_pdd11997110103.jpg',
			nickname: '卡卡罗特',
			userName: '孙悟空',
			userId: 'uuid-000000001',
			salt: 'CGT'
		},
		token: ''
	})
	/**
	 * @description 获取用户信息
	 */
	const getUserInfo = () => {
		return data.userInfo
	}
	/**
	 * @description 设置用户信息
	 */
	const setUserInfo = (obj: IUserInfo) => {
		data.userInfo = obj
	}

	return {
		...toRefs(data),
		getUserInfo,
		setUserInfo
	}
})
