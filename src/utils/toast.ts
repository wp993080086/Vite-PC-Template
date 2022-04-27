import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus'

// 成功：顶部短消息提示
function success(message = '操作成功') {
  return ElMessage({
    type: 'success',
    message,
    showClose: true
  })
}

// 警告：顶部短消息提示
function warn(message = '操作成功') {
  return ElMessage({
    type: 'error',
    message,
    showClose: true
  })
}

// 失败：提示错误语
function error(message: string, options?: ElMessageBoxOptions) {
  return ElMessageBox.alert(message || '操作失败', '错误', options)
}

// 自定义Confirm
function confirm(message: string, title = '温馨提示', opt: ElMessageBoxOptions = {}) {
  opt.customClass = `${opt.customClass || ''} f-messagebox`
  opt.cancelButtonClass = `${opt.cancelButtonClass || ''} is-plain`
  opt.cancelButtonText = opt.cancelButtonText || '取消'
  opt.confirmButtonText = opt.confirmButtonText || '确认'
  opt.closeOnPressEscape = false
  return ElMessageBox.confirm(message, title, opt)
}

// 自定义Alert
function alert(message: string, title = '提示', opt: ElMessageBoxOptions = {}) {
  opt.customClass = `${opt.customClass || ''} f-messagebox`
  return ElMessageBox.alert(message, title, opt)
}

export default {
  success,
  warn,
  error,
  alert,
  confirm
}
