const tokenKey = `token_${import.meta.env.VITE_BASE}`

// 删除token
export function clearToken() {
  sessionStorage.removeItem(tokenKey)
}

// 获取token
export function getToken() {
  return sessionStorage.getItem(tokenKey) || ''
}

// 设置token
export function setToken(token: string) {
  if (!token || typeof token !== 'string') {
    throw new Error('tokenKey 必须是 string')
  }
  sessionStorage.setItem(tokenKey, token)
}
