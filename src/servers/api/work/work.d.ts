/* eslint-disable camelcase */
export interface IList {
  city: string
  typeId: string
  endTime: string
  expectTime: string
  startTime: string
  storeId: string
  wkorderId: string
  tasksStatus: number | string
  orderType?: number
}
export interface IDetails {
  wkorderId: string
}
export interface IEdit {
  wkorderId: string
  tasksStatus: number
  teamId?: string
  teamName?: string
  teamTelephone?: string
  manufacturerName?: string
  builderName?: string
  builderTelephone?: string
  storeName?: string
  passReason?: string
}
