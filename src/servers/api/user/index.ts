import Request from '@/servers/request'
import Module from '@/servers/module'
import { ILoginParam, IUserDetails, IUserReset } from './user'

export default {
  /**
   * 登录
   * @param {Object} accessToken SSO的token
   */
  login(param: ILoginParam) {
    return Request.post(Module.User, '/login/store/dologin', { ...param }, { noAccessToken: true })
  },
  /**
   * 登出
   * @param {void}
   */
  logout() {
    return Request.post(Module.User, '/login/store/dologout', null)
  },
  /**
   * 获取用户详情
   * @param {string} userId 用户ID
   * @param {string} userType 用户类型
   */
  getDetails(param: IUserDetails) {
    return Request.post(Module.User, '/provider/user/info', { ...param })
  },
  /**
   * 重置密码
   * @param {string} userId 用户ID
   */
  resetPwd(param: IUserReset) {
    return Request.post(Module.User, '/provider/resetPassword', { ...param })
  }
}
