/* eslint-disable camelcase */
export interface ILoginParam {
  accessToken: string
  channel?: string
  channelDate?: string
  channelJnlNo?: string
  sourceSystemId?: string
  ssId?: string
  ssName?: string
  ssType?: string
  ssUName?: string
}
export interface IUserDetails {
  userId: string
  userType: number | string
}

export interface IUserReset {
  userId?: string
}

export interface ISwitchDept {
  deptId: string
}
