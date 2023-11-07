import { IUserModules } from '@/types/store/user'

/**
 * @description 登录request
 */
export interface ILoginReq {
	username: string
	password: string
	verifyCode: string
}
/**
 * @description 登录response
 */
export interface ILoginRes extends IUserModules {
	timestamp: number
}
/**
 * @description 获取验证码request
 */
export interface IGetCaptchaReq {
	timestamp: number
}
/**
 * @description 获取验证码response
 */
export interface IGetCaptchaRes {
	captcha: number
}
