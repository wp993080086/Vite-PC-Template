import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast, Alert } from '@/utils/toast'
import { superLocal, superSession } from '@/utils/storage'
import { HTTP_CODE, TIMEOUT_LIMIT, ERROR_CODE } from '@/constants'
import { THttpResponse } from '@/types/common'
import { getToken } from '@/utils/token'

export const createAxiosExamples = (config?: AxiosRequestConfig): AxiosInstance => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		timeout: TIMEOUT_LIMIT,
		withCredentials: true, // 跨域携带cookie
		headers: { 'Content-Type': 'application/json' },
		...config // 自定义配置
	})

	/**
	 * @description 请求拦截器
	 */
	instance.interceptors.request.use(
		(config) => {
			const T = getToken()
			if (T) {
				config.headers['Authorization'] = `Bearer ${T}`
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	/**
	 * @description 响应拦截器
	 */
	instance.interceptors.response.use(
		// 成功
		(response: AxiosResponse<TAny, THttpResponse>) => {
			const res = response.data
			const code = response.data.code
			// 如果是Blob数据 则直接返回
			if (res instanceof Blob) return res
			if (code === ERROR_CODE.EXPIRE) {
				Alert('登录状态已过期，请重新登录', { confirmButtonText: '确定' })
					.then(() => {
						// 清除浏览器全部缓存
						superLocal.clear()
						superSession.clear()
						window.location.href = '/' // 去登录页
					})
					.catch(() => false)
			} else if (code !== ERROR_CODE.SUCCESS) {
				Toast(res.message || '请求失败！', { type: 'error' })
				return Promise.reject(new Error(res.message || '请求失败！'))
			}
			return res
		},
		// 失败
		(error) => {
			const { response, message } = error
			const resData = response?.data
			let errorMsg = `${response?.status || error.message}：请求出错！`
			const httpMessage = HTTP_CODE.find((item) => item.code === response?.status)
			if (httpMessage) errorMsg = httpMessage.message
			// 处理报错提示
			if (message.indexOf('timeout') !== -1) {
				Toast('网络超时', { type: 'error' })
			} else if (message === 'Network Error') {
				Toast('网络连接错误', { type: 'error' })
			} else if (message === 'canceled') {
				Toast('请求已取消', { type: 'error' })
			} else if (resData?.message && resData?.code) {
				Toast(`${resData.code}：${resData.message}`, { type: 'error' })
			} else {
				Toast(errorMsg, { type: 'error' })
			}
			return Promise.reject(error)
		}
	)
	return instance
}
