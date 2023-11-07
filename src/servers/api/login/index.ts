import { createAxiosExamples } from '@/servers/request'
const R = createAxiosExamples()
import { THttpResponse } from '@/types/common'
import { ILoginReq, ILoginRes, IGetCaptchaReq, IGetCaptchaRes } from '@/types/servers/login'

export default {
	/**
	 * @description 登录
	 * @param {String} username 账号
	 * @param {String} password 密码
	 * @param {String} verifyCode 验证码
	 */
	login(data: ILoginReq) {
		return R.post<null, THttpResponse<ILoginRes>>('/api/user/login', data)
	},
	/**
	 * @description 获取验证码
	 * @param {number} timestamp 时间戳
	 */
	getCaptcha(data: IGetCaptchaReq) {
		return R.get<null, THttpResponse<IGetCaptchaRes>>('/api/system/captcha/get', { params: data })
	}
}
