import Request from '@/services/request'
import Module from '@/services/module'
import { ILoginParam, IUserDetails, IUserReset, ISwitchDept } from './user'

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
  },
  /**
   * 获取部门列表
   * @param {string} userId 用户ID
   */
  getDeptList() {
    return Request.post(Module.User, '/store/deptList', null)
  },
  /**
   * 切换部门
   * @param {string} userId 用户ID
   */
  switchDept(param: ISwitchDept) {
    return Request.post(Module.User, '/store/switchDept', { ...param })
  }
}
