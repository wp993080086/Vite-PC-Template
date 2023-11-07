import { STORAGE_PREFIX } from '@/constants/index'

/**
 * @description sessionStorage的封装
 * @method get 获取某项
 * @method set 设置某项
 * @method remove 删除某项
 * @method clear 删除全部
 * @method has 是否存在某项
 */
export const superSession = {
	/**
	 * @description 获取某项
	 * @param {string} key 键
	 * @returns {Any} data 数据源
	 */
	get: <T>(key: string): T | null => {
		const data = window.sessionStorage.getItem(`${STORAGE_PREFIX}-${key}`)!
		return JSON.parse(data)
	},
	/**
	 * @description 设置某项 undefined会自动转换为null
	 * @param {string} key 键
	 */
	set: (key: string, value: TAny) => {
		const data = value === undefined ? null : value
		window.sessionStorage.setItem(`${STORAGE_PREFIX}-${key}`, JSON.stringify(data))
	},
	/**
	 * @description 删除某项
	 * @param {string} key 键
	 */
	remove: (key: string) => {
		window.sessionStorage.removeItem(`${STORAGE_PREFIX}-${key}`)
	},
	/**
	 * @description 删除全部
	 */
	clear: () => {
		window.sessionStorage.clear()
	},
	/**
	 * @description 是否存在某项
	 * @param {string} key 键
	 * @returns {boolean} true/false
	 */
	has: (key: string) => {
		const data = window.sessionStorage.getItem(`${STORAGE_PREFIX}-${key}`)!
		const result = JSON.parse(data)
		if (result === null) return false
		return true
	}
}

/**
 * @description localStorage的封装
 * @method get 获取某项
 * @method set 设置某项
 * @method remove 删除某项
 * @method clear 删除全部
 * @method has 是否存在某项
 */
export const superLocal = {
	/**
	 * @description 获取某项
	 * @param {string} key 键
	 * @returns {Any} data 数据源
	 */
	get: <T>(key: string): T | null => {
		const data = window.localStorage.getItem(`${STORAGE_PREFIX}-${key}`)!
		return JSON.parse(data)
	},
	/**
	 * @description 设置某项 undefined会自动转换为null
	 * @param {string} key 键
	 */
	set: (key: string, value: TAny) => {
		const data = value === undefined ? null : value
		window.localStorage.setItem(`${STORAGE_PREFIX}-${key}`, JSON.stringify(data))
	},
	/**
	 * @description 删除某项
	 * @param {string} key 键
	 */
	remove: (key: string) => {
		window.localStorage.removeItem(`${STORAGE_PREFIX}-${key}`)
	},
	/**
	 * @description 删除全部
	 */
	clear: () => {
		window.localStorage.clear()
	},
	/**
	 * @description 检测是否存在某项
	 * @param {string} key 键
	 * @returns {boolean} true/false
	 */
	has: (key: string) => {
		const data = window.localStorage.getItem(`${STORAGE_PREFIX}-${key}`)!
		const result = JSON.parse(data)
		if (result === null) return false
		return true
	}
}
