import { superLocal } from '@/utils/storage'

/**
 * @description 获取Token
 */
export function getToken() {
	return superLocal.get('token')
}

/**
 * @description 设置Token
 */
export function setToken(token: string) {
	return superLocal.set('token', token)
}

/**
 * @description 删除Token
 */
export function removeToken() {
	return superLocal.remove('token')
}
