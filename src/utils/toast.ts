import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  MessageProps,
  ElMessageBoxOptions,
  NotificationParams
} from 'element-plus'

/**
 * toast轻提示
 * @param {String} message
 * @param {MessageParams} option
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
 * alert提示框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Alert = (message: string, config: ElMessageBoxOptions = {}) => {
  const defaultOption = {
    title: '温馨提示',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '确认',
    draggable: true,
    customClass: `${config.customClass || ''} p_messagebox`
  }
  const option = { ...defaultOption, ...config }
  return ElMessageBox.alert(message, option)
}
/**
 * confirm确认框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Confirm = (message: string, config: ElMessageBoxOptions = {}) => {
  const defaultOption = {
    title: '温馨提示',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    draggable: true,
    customClass: `${config.customClass || ''} p_messagebox`
  }
  const option = { ...defaultOption, ...config }
  return ElMessageBox.confirm(message, option)
}
/**
 * notification通知
 * @param {NotificationParams} option
 */
export const Notification = (option: NotificationParams = {}) => {
  return ElNotification(option)
}
