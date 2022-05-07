import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import Module from './module'
import { errorCode, baseRouter } from '@/config'
import Toast from '@/utils/toast'
import { getToken } from '@/servers/token'
import { TQueryType, THaveCode, TParams, TRequestType, THttpResponse } from './request.d'

const baseURL = import.meta.env.VUE_APP_URL
const envType = import.meta.env.VUE_APP_ENV
axios.defaults.withCredentials = true

console.log(`${envType}：${baseURL}`)

if (envType !== 'LOCAL') {
  axios.defaults.baseURL = baseURL
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    module?: string
    loading?: boolean
    noAccessToken?: boolean
    isForm?: boolean
    token?: string
  }
}

// axios实例
const instance = axios.create({
  timeout: 15 * 1000,
  headers: {
    ContentType: 'application/json;charset=utf-8',
    AccessControlAllowOrigin: '*'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.noAccessToken) {
      ;(config.headers as AxiosRequestConfig).token = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<THttpResponse & THaveCode>) => {
    const { data } = response
    const key = data.code.slice(-5)
    if (key !== errorCode.SUCCESS) {
      if (key === errorCode.EXPIRE) {
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userDetails')
        Toast.alert('登录状态过期，请重新登录 !', '温馨提示', { showClose: false }).then(() => {
          window.location.href = baseRouter.LOGIN
        })
      }
      return Toast.warn(data.message)
    }
    return data
  },
  error => {
    // 请求失败
    try {
      const errorInfo = error.response
      const status = (errorInfo.status || 0) * 1
      Toast.error(errorInfo.data.message)
      switch (status) {
        case 400:
          console.error('400 服务器不理解该请求 ！')
          break
        case 403:
          console.error('403 服务器拒绝该请求 ！')
          break
        case 404:
          console.error('404 服务器找不到该请求 ！')
          break
        case 500:
          console.error('500 系统内部错误 ！')
          break
        default:
          console.error(errorInfo.data.message || '系统错误 ！')
      }
      return Promise.reject(errorInfo)
    } catch (e) {
      Toast.error('网络开小差啦 ！')
      return Promise.reject(new Error('网络开小差啦 ！'))
    }
  }
)

// 处理Url
function makeUrl(type: TRequestType, module: string, path: string, data: TParams) {
  const query: TQueryType = { ...(data || {}) }
  if (path[0] !== '/') path = `/${path}`
  let url = ''
  envType === 'LOCAL' ? (url = '/api') : (url = baseURL as string)
  if (type === 'get') {
    url += `${module}${path}?${qs.stringify(query)}`
  } else {
    url += `${module}${path}`
  }
  return url
}

// 请求封装
export default {
  async get<T = TAny>(
    module: Module,
    path: string,
    data?: TDict<TAny>,
    config?: Partial<AxiosRequestConfig>
  ) {
    const url = makeUrl('get', module, path, data)
    return instance.get<null, THttpResponse<T>>(url, config)
  },
  async post<T = TAny>(
    module: Module,
    path: string,
    data?: TDict<TAny> | null,
    config?: Partial<AxiosRequestConfig>
  ) {
    const url = makeUrl('post', module, path, data)
    return instance.post<null, THttpResponse<T>>(url, data ?? {}, config)
  }
}
