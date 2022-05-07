export type TQueryType = {
  token?: string
  [prop: string]: TAny
}

export type THaveCode = {
  code: string
  message: string
}

export type TParams = TDict<TAny> | undefined | null

export type TRequestType = 'get' | 'post'

export type THttpResponse<T = TAny> = {
  code: number | string
  message: string
  data: T | null | undefined
}
