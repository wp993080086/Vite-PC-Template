export const errorCode = {
  SUCCESS: '00000', // 正常
  EXPIRE: '99990' // 登陆过期
}

export const baseRouter = {
  LOGIN: '/login',
  NOT_FOUND: '/not-found'
}

export const httpCode = [
  { code: 301, message: '301：请求的资源已被永久移动到新URl' },
  { code: 302, message: '302：请求的数据被临时移动' },
  { code: 303, message: '303：使用GET和POST请求查看其它地址' },
  { code: 304, message: '304：请求的资源未修改' },
  { code: 305, message: '305：请求的资源必须通过代理访问' },
  { code: 307, message: '307：使用GET请求重定向' },
  { code: 400, message: '400：客户端请求语法错误' },
  { code: 401, message: '401：请求要求用户的身份认证' },
  { code: 403, message: '403：服务器理解客户端的请求但拒绝执行' },
  { code: 404, message: '404：服务器无法根据客户端的请求找到资源' },
  { code: 405, message: '405：客户端请求中的方法被禁止' },
  { code: 406, message: '406：服务器无法根据客户端请求的内容特性完成请求' },
  { code: 407, message: '407：请求要求使用代理进行授权' },
  { code: 408, message: '408：服务器等待客户端发送的请求超时' },
  { code: 409, message: '409：服务器在完成请求时发生冲突' },
  { code: 410, message: '410：客户端请求的资源已经不存在' },
  { code: 411, message: '411：服务器无法处理客户端发送的不带Content-Length的请求信息' },
  { code: 412, message: '412：客户端请求信息的先决条件错误' },
  { code: 413, message: '413：请求被拒绝，实体过大，服务器无法处理' },
  { code: 414, message: '414：请求的URL过长服务器无法处理' },
  { code: 415, message: '415：服务器无法处理请求附带的媒体格式' },
  { code: 416, message: '416：客户端请求的范围无效' },
  { code: 417, message: '417：服务器无法满足Expect的请求头信息' },
  { code: 500, message: '500：服务器内部错误' },
  { code: 501, message: '501：服务器不支持请求的功能，无法完成' },
  { code: 502, message: '502：服务器作为网关或代理，从远端服务器收到无效响应' },
  { code: 503, message: '503：由于超载或停机维护，服务器目前无法使用' },
  { code: 504, message: '504：服务器作为网关或代理，未及时从远端服务器获取请求' },
  { code: 505, message: '505：服务器不支持请求的HTTP协议版本' }
]
