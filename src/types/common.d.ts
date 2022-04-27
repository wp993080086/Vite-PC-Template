// 字典
declare type TDict<T> = {
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