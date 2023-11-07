import { IThrottleFunction, IDebounceFunction } from '@/types/common'

// 手机号码校验
export const validateMobile = (rule: unknown, value: string, callback: (value?: Error) => void) => {
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
 * @param  {Number} ms 睡眠时间
 * @return {Promise} Promise
 */
export const sleep = (ms = 500) => {
	if (typeof ms !== 'number') {
		throw new Error('The argument needs to be Number !')
	}
	return new Promise((res) => {
		setTimeout(res, ms)
	})
}
/**
 * 节流
 * @param {Function} fn 事件
 * @param {Number} limit 触发间隔
 */
export const throttle = <F extends TFunc>(fn: F, limit = 200): IThrottleFunction<F> => {
	let wait = false
	// eslint-disable-next-line func-names
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
 * @param {Function} fn 事件
 * @param {Number} wait 触发间隔
 * @param {Number} immediate 是否立即触发一次
 */
export const debounce = <F extends TFunc>(fn: F, wait: number, immediate = false): IDebounceFunction<F> => {
	let timeout: ReturnType<typeof setTimeout>
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
 * 获取变量的类型
 * @param {object} value 变量值
 * @return {string} 变量类型
 */
export function getType(value: TAny) {
	return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 获取随机数
 * @param {Number} Limit 随机数上限
 */
export const getRandom = (Limit = 10) => {
	return Math.round(Math.random() * Limit)
}

/**
 * 生成uuid
 * @param {object} value 变量值
 */
export function createUuid(label = 'uuid') {
	let Time = new Date().getTime()
	const uuid = 'x_xx_xxx_xxxx_xxxxx'.replace(/[xy]/g, (res) => {
		const Random = (Time + Math.random() * 16) % 16 | 0
		Time = Math.floor(Time / 16)
		return (res === 'x' ? Random : (Random & 0x3) | 0x8).toString(16)
	})
	return `${label}_${uuid}`
}

/**
 * 深拷贝（递归）
 * @param {*} sourceValue 需要拷贝的值
 */
export const deepClone = (sourceValue: TAny) => {
	// 如果传入的数据是简单类型（不是 {} & []），直接返回即可
	if (typeof sourceValue !== 'object') {
		return sourceValue
	}
	// 判断 传入参数的数据类型(object or array)
	const targetType = getType(sourceValue)
	// 根据传入参数的数据类型，创建 初始存储结果的变量类型 {} or []
	const result: TAny = targetType === 'Object' ? {} : []
	// 遍历 sourceValue (for...in可以遍历数据和对象)
	// 避免数组内有自定义属性，遍历数组使用 for...of，遍历对象 for...in
	if (targetType === 'Array') {
		// 传入参数是数组时，次数使用的是 for...of 遍历，当然，也可以使用 数组的其他遍历方法
		for (const [key, value] of sourceValue.entries()) {
			const itemType = getType(value)
			// 如果 value 是 数组 或 对象，则继续遍历
			if (itemType === 'Object' || itemType === 'Array') {
				result[key] = deepClone(value)
			} else {
				// 如果 value 是 基本数据类型 或者 函数，直接赋值即可
				result[key] = value
			}
		}
	} else {
		// 传入参数是对象时
		for (const key in sourceValue) {
			// 遍历数组时，key 为数组的 下标
			// 遍历对象时，key 为对象的 key
			// hasOwnProperty 只能检验对象自身的属性，不能检验继承属性，也不能检验原型链上的属性
			if (Object.prototype.hasOwnProperty.call(sourceValue, key)) {
				const item = sourceValue[key]
				const itemType = getType(item)
				// 如果 value 是 数组 或 对象，则继续遍历
				if (itemType === 'Object' || itemType === 'Array') {
					result[key] = deepClone(item)
				} else {
					// 如果 value 是 基本数据类型 或者 函数，直接赋值即可
					result[key] = item
				}
			}
		}
	}
	return result
}
/**
 * 排序
 * @param {String} key 排序的键
 * @param {String} up 是否升序
 */
export const getSort = (key: string, up: boolean) => {
	return (k1: TDict, k2: TDict) => {
		let value1 = k1[key]
		let value2 = k2[key]
		if (up) {
			return value1 - value2
		}
		return value2 - value1
	}
}
/**
 * 下载文件
 * @param {blob} blob 文件流
 * @param {string} title 标题
 */
export const downloadBlob = (blob: Blob, title: string) => {
	// 设置blob
	const b = new Blob([blob], { type: 'application/vnd.ms-excel' })
	// 创建a标签
	const a = document.createElement('a')
	a.style.display = 'none'
	a.href = URL.createObjectURL(b)
	a.download = title
	document.body.appendChild(a)
	a.click()
	a.remove()
}
/**
 * 根据页数和每页条数切割数据做分页
 * @param {array} data 数据
 * @param {number} pageNum 页数
 * @param {number} pageSize 每页条数
 */
export const getPagingData = <T = TAny>(data: Array<T>, pageNum: number, pageSize: number): Array<T> => {
	let start = pageSize * (pageNum - 1)
	const end = start + pageSize
	return data.slice(start, end)
}
/**
 * @description 复制文本
 * @param {string} text 数据
 */
export const copyText = (text: string) => {
	return new Promise<void>((resolve, reject) => {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					resolve()
				})
				.catch((error) => {
					console.error('Text Copy Error：', error)
					reject(new Error(error))
				})
		} else {
			// 创建text area
			const textArea = document.createElement('textarea')
			textArea.value = text
			// 使text area不在viewport，同时设置不可见
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			// 执行复制命令并移除文本框
			document.execCommand('copy') ? resolve() : reject(new Error('Text Copy Error'))
			textArea.remove()
		}
	})
}

/**
 * @description 使用Canvas计算字符串的长度px值（需要先创建一个ID为getStringPxByCanvas的canvas元素）
 * @param {string} str 字符串
 * @param {string} font 字体样式
 */
export const getStringPxByCanvas = (
	str: string,
	font: string = '14px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif'
) => {
	let canvasDom = document.getElementById('getStringPxByCanvas') as HTMLCanvasElement
	if (!canvasDom) {
		console.error('未找到目标Canvas，已自动创建！')
		canvasDom = document.createElement('canvas')
		canvasDom.style.display = 'none'
		canvasDom.style.visibility = 'hidden'
		document.getElementsByTagName('body')[0].appendChild(canvasDom)
	}
	const ctx = canvasDom.getContext('2d')!
	ctx.font = font
	const metrics = ctx.measureText(str)
	return metrics.width
}

/**
 * @description 设置元素全屏
 * @param id 元素ID
 */
export const setElementFullScreenState = (id: string) => {
	const element = document.getElementById(id)!
	try {
		if (element?.requestFullscreen) {
			element.requestFullscreen()
			// @ts-ignore
		} else if (element?.mozRequestFullScreen) {
			// @ts-ignore
			element.mozRequestFullScreen()
			// @ts-ignore
		} else if (element?.msRequestFullscreen) {
			// @ts-ignore
			element.msRequestFullscreen()
			// @ts-ignore
		} else if (element?.webkitRequestFullscreen) {
			// @ts-ignore
			element.webkitRequestFullScreen()
		}
	} catch (error) {
		console.warn(error)
	}
}

/**
 * @description 退出全屏状态
 */
export const exitFullScreenState = () => {
	try {
		if (document.exitFullscreen) {
			document.exitFullscreen()
			// @ts-ignore
		} else if (document?.webkitCancelFullScreen) {
			// @ts-ignore
			document?.webkitCancelFullScreen()
			// @ts-ignore
		} else if (document?.mozCancelFullScreen) {
			// @ts-ignore
			document?.mozCancelFullScreen()
			// @ts-ignore
		} else if (document?.msExitFullscreen) {
			// @ts-ignore
			document?.msExitFullscreen()
		}
	} catch (error) {
		console.warn(error)
	}
}

/**
 * @description 获取全屏状态
 */
export const getFullScreenState = () => {
	const isFull =
		// @ts-ignore
		document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
	return isFull
}
