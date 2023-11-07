/**
 * @description Axios Request返回体
 * @param {number} code 错误码
 * @param {string} message 提示信息
 * @param {any} data 返回数据
 */
export type THttpResponse<T = TDict> = {
	code: number
	message: string
	data: T
}
/**
 * @description Dialog 按钮的配置
 * @param {string} type 按钮风格
 * @param {string} label 按钮文案
 * @param {boolean} plain 是否朴素按钮
 * @param {string} size 按钮大小
 * @param {string} command 指令
 * @param {boolean} disabled 禁用
 * @param {boolean} manualClose 是否要点击X手动关闭
 * @param {boolean} isLoading 是否Loading
 * @param {boolean} isAsync 是否异步关闭
 */
export type TDialogButtonOption = Partial<{
	type: undefined | 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
	plain: boolean
	size: 'large' | 'default' | 'small'
	isLoading: boolean
	command: string
	disabled: boolean
	manualClose: boolean
	isAsync: boolean
	label: string
}>
/**
 * @description 节流
 * @param {function} fn 函数
 */
export interface IThrottleFunction<F extends TFunc> {
	(this: ThisParameterType<F>, ...args: Parameters<F>): void
}
/**
 * @description 防抖
 * @param {function} fn 函数
 * @param {function} cancel 取消回调
 */
export interface IDebounceFunction<F extends TFunc> {
	(this: ThisParameterType<F>, ...args: Parameters<F>): void
	cancel: () => void
}
