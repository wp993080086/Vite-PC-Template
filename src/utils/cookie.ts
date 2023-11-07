import { ONEDAY } from '@/constants'

/**
 * @description 设置cookie
 * @param {string} key 键
 * @param {string} value 值
 * @param {string} expires 过期时间（yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss 或 时间戳）默认：页面关闭即过期
 * @param {string} domain 域 默认：当前域
 * @param {string} path 路径 默认：/
 */
export function setCookie(key: string, value: string, expires = '', domain = window.location.hostname, path = '/') {
	const time = expires ? new Date(expires) : ''
	const cookie = `${key}=${value}; expires=${time}; domain=${domain}; path=${path}`
	document.cookie = cookie
}
/**
 * @description 获取所有cookie的key
 * @return {Array<string>} Cookie键组成的数组
 */
function getAllCookieKey() {
	const Cookie = document.cookie
	const cookieList = Cookie.split('; ')
	return cookieList.map((item) => {
		return item.split('=')[0]
	})
}

/**
 * @description 根据key获取对应cookie的值
 * @param {string} key 键
 * @return {string} value 值
 */
function getCookie(key: string) {
	const Cookie = document.cookie
	const cookieList = Cookie.split('; ')
	const cookieKeyList = cookieList.map((item) => {
		return item.split('=')[0]
	})
	const index = cookieKeyList.indexOf(key)
	return cookieList[index].split('=')[1]
}

/**
 * @description 根据key清除cookie
 * @param {string} key 键
 * @param {string} domain 域 默认：当前域
 * @param {string} path 路径 默认：/
 */
function removeCookie(key: string, domain = window.location.hostname, path = '/') {
	const Time = new Date()
	Time.setTime(Time.getTime() - ONEDAY)
	const expires = `expires=${Time.toUTCString()}`
	document.cookie = `${key}=; ${expires}; path=${path}; domain=${domain}`
}

/**
 * @description 清除所有cookie
 * @param {string} domain 域 默认：当前域
 * @param {string} path 路径 默认：/
 */
function clearAllCookie(domain = window.location.hostname, path = '/') {
	const cookieKeyList = getAllCookieKey()
	for (let key of cookieKeyList) {
		removeCookie(key)
	}
}
