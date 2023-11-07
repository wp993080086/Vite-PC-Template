/**
 * @description 任意类型
 */
declare type TAny = TAny

/**
 * @description 泛型对象 默认any
 */
declare type TDict<T = TAny> = {
	[key: string]: T
}

/**
 * @description 泛型函数 默认any
 */
declare type TFunc<T = TAny> = (...args: Array<TAny>) => T
