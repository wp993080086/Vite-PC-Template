type Procedure = (...args: TAny[]) => TAny
interface ThrottleFunction<F extends Procedure> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void
}
interface DebounceFunction<F extends Procedure> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void
  cancel: () => void
}
/**
* 返回数据类型
* @param  {String} value 数据类型 比如 returnType(false) 返回 'Boolean'
*/
export const returnType = (value: unknown) => {
  if (!Number.isNaN) {
    Number.isNaN = function(val) {
      return (typeof (val) === 'number' && window.isNaN(val))
    }
  }
  let type
  if (typeof (value) === 'number' && isNaN(value)) {
    type = 'NaN'
  } else {
    const info = Object.prototype.toString.call(value)
    type = info.split(' ')[1].split(']')[0]
  }
  return type
}
/**
* 获取随机数
* @param {Number} Limit 随机数上限
*/
export const getRandom = (Limit = 10) => {
  return Math.round(Math.random() * Limit)
}
/**
 * 手机号码校验
 * @param {String} value
 * @param {Function} 回调
 */
export const validateMobile = (value: string, callback: (value?: Error) => void) => {
  const RegExp = /^1\d{10}$/
  if (value === '') {
    callback(new Error('请填写联系电话'))
  } else if (!RegExp.test(value)) {
    callback(new Error('手机号码格式有误'))
  } else {
    callback()
  }
}
/**
 * 睡眠
 * @param  {Number} ms 休眠时间
 * @return {Promise} SetTimeout promise
 */
export const sleep = (ms = 500) => {
  if (typeof ms !== 'number') {
    throw new Error('param must be a number')
  }
  return new Promise(res => {
    setTimeout(res, ms)
  })
}
/**
 * 节流
 * @param {Function} fn 事件
 * @param {Number} limit 触发间隔
 */
export const throttle = <F extends Procedure>(fn: F, limit = 200): ThrottleFunction<F> => {
  let wait = false
  return function (this: void, ...args: Parameters<F>) {
    if (wait === false) {
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
      return fn.apply(this, args)
    }
    return null
  }
}
/**
 * 防抖
 * @param {Number} wait 触发间隔
 * @param {Function} fn 事件
 * @param {Number} immediate 是否立即触发一次
 */
export const debounce = <F extends Procedure>(
  wait: number,
  fn: F,
  immediate = false
): DebounceFunction<F> => {
  let timeout: NodeJS.Timeout
  const debounced = function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout
      if (immediate !== true) {
        fn.apply(this, args)
      }
    }
    clearTimeout(timeout)
    if (immediate === true && timeout === undefined) {
      fn.apply(this, args)
    }
    timeout = setTimeout(later, wait)
  }
  debounced.cancel = () => {
    clearTimeout(timeout)
  }
  return debounced
}
/**
* 生成uuid
* @param {String} prefix 前缀
*/
export const createUuid = (prefix = 'pdd') => {
  let Time = new Date().getTime()
  const uuid = 'x_xx_xxx_xxxx'
    .replace(/[xy]/g, (res) => {
      const Random = (Time + Math.random() * 16) % 16 | 0
      Time = Math.floor(Time / 16)
      return (res === 'x' ? Random : (Random & 0x3 | 0x8)).toString(16)
    })
  return `${prefix}_${uuid}`
}