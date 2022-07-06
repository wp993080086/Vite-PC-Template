// 泛型对象字典
declare type TDictObject<T> = {
  [key: string]: T
}

// 任意类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TAny = any

// 任意类型对象
declare type TAnyType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// 任意类型数组
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TAnyArray = Array<any>

// 泛型数组
declare type TDictArray<T> = Array<T>

// 任意函数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TAnyFunc = (...args: any[]) => any
