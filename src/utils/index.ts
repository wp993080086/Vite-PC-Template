import { IThrottleFunction, IDebounceFunction } from './utils'

/**
 * 返回数据类型
 * @param  {String} value 数据类型 比如 returnType(false) 返回 'Boolean'
 */
export const returnType = (value: unknown) => {
  if (!Number.isNaN) {
    Number.isNaN = function (val) {
      return typeof val === 'number' && window.isNaN(val)
    }
  }
  let type
  if (typeof value === 'number' && isNaN(value)) {
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
  const RegExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
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
export const throttle = <F extends TAnyFunc>(fn: F, limit = 200): IThrottleFunction<F> => {
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
export const debounce = <F extends TAnyFunc>(
  wait: number,
  fn: F,
  immediate = false
): IDebounceFunction<F> => {
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
  const uuid = 'x_xx_xxx_xxxx'.replace(/[xy]/g, res => {
    const Random = (Time + Math.random() * 16) % 16 | 0
    Time = Math.floor(Time / 16)
    return (res === 'x' ? Random : (Random & 0x3) | 0x8).toString(16)
  })
  return `${prefix}_${uuid}`
}
/**
 * 设置本地storage
 * @param {String} key 键
 * @param {Any} data 数据源
 * @param {String} type 存储类型 local || session
 */
export const setStorage = (
  key: string,
  data: string | number | TAnyArray | TAnyType,
  type: 'session' | 'local' = 'session'
) => {
  const env = process.env.NODE_ENV as string
  if (type === 'session') {
    sessionStorage.setItem(`${key}_${env}`, JSON.stringify(data))
  } else {
    localStorage.setItem(`${key}_${env}`, JSON.stringify(data))
  }
}
/**
 * 获取本地storage
 * @param {String} key 键
 * @param {String} type 存储类型 local || session
 */
export const getStorage = (key: string, type: 'session' | 'local' = 'session') => {
  const env = process.env.NODE_ENV as string
  const target =
    type === 'session'
      ? sessionStorage.getItem(`${key}_${env}`)
      : localStorage.getItem(`${key}_${env}`)
  return target ? JSON.parse(target) : target
}

/**
 * 删除本地storage
 * @param {String} key 键 || 'all' || 键数组
 * @param {String} type 存储类型 local || session
 */
export const deleteStorage = (
  key: 'all' | string | string[],
  type: 'session' | 'local' = 'session'
) => {
  const env = process.env.NODE_ENV as string
  if (typeof key === 'string') {
    if (key === 'all') {
      type === 'session' ? sessionStorage.clear() : localStorage.clear()
    } else {
      type === 'session'
        ? sessionStorage.removeItem(`${key}_${env}`)
        : localStorage.removeItem(`${key}_${env}`)
    }
  } else if (key.length > 0) {
    if (type === 'session') {
      key.forEach(item => {
        sessionStorage.removeItem(`${item}_${env}`)
      })
    } else {
      key.forEach(item => {
        localStorage.removeItem(`${item}_${env}`)
      })
    }
  }
}
