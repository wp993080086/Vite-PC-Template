/**
 * @description 用户模块
 */
export interface IUserModules {
	userInfo: IUserInfo
	token: string
}
/**
 * @description 用户信息
 * @member admin 权限
 * @member nickname 昵称
 * @member userName 用户名称
 * @member userId 用户ID
 * @member portrait 头像
 */
export interface IUserInfo {
	admin: number
	nickname: string
	userName: string
	userId: string
	portrait: string
	salt: string
}
