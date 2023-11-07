import { ElMessage, ElMessageBox, ElNotification, MessageProps, ElMessageBoxOptions, NotificationParams } from 'element-plus'

/**
 * @description toast轻提示
 * @param {String} message 信息
 * @param {MessageParams} option 配置
 */
export const Toast = (message: string, option: Partial<MessageProps> = {}) => {
	return ElMessage({
		message,
		showClose: true,
		grouping: true,
		duration: 2000,
		...option
	})
}
/**
 * @description alert提示框
 * @param {String} message 信息
 * @param {ElMessageBoxOptions} config 配置
 */
export const Alert = (message: string, config: ElMessageBoxOptions = {}) => {
	const defaultOption = {
		title: '温馨提示',
		closeOnClickModal: false,
		closeOnPressEscape: false,
		confirmButtonText: '确认',
		draggable: true,
		customClass: `${config.customClass || ''} peng_message_box`
	}
	const option = { ...defaultOption, ...config }
	return ElMessageBox.alert(message, option)
}
/**
 * @description confirm确认框
 * @param {String} message 信息
 * @param {ElMessageBoxOptions} config 配置
 */
export const Confirm = (message: string, config: ElMessageBoxOptions = {}) => {
	const defaultOption = {
		title: '温馨提示',
		closeOnClickModal: false,
		closeOnPressEscape: false,
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		draggable: true,
		customClass: `${config.customClass || ''} peng_message_box`
	}
	const option = { ...defaultOption, ...config }
	return ElMessageBox.confirm(message, option)
}
/**
 * @description notification通知
 * @param {NotificationParams} option 配置
 */
export const Notification = (option: NotificationParams = {}) => {
	return ElNotification(option)
}
