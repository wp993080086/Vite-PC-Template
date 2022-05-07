import Request from '@/services/request'
import Module from '@/services/module'
import { IList, IDetails, IEdit, ISplitWork } from './work'

export default {
  /**
   * 获取列表
   * @param {String} city 城市
   * @param {String} typeId 设备类型
   * @param {String} startTime 开始时间
   * @param {String} endTime 结束时间
   * @param {String} expectTime 上门时间
   * @param {String} storeId 门店ID
   * @param {String} wkorderId 任务工单id
   * @param {String} tasksStatus 任务状态
   * @param {String} orderType 工单类型  1新装 2维修 3拆卸
   */
  getWkorderList(param: IList) {
    return Request.post(Module.Work, '/operation/getWoPage', { ...param })
  },
  /**
   * 获取任务详情
   * @param {String} wkorderId 工单ID
   */
  getWkorderDetails(param: IDetails) {
    return Request.post(Module.Work, '/operation/getWoById', { ...param })
  },
  /**
   * 修改任务
   * @param {String} wkorderId 工单ID
   * @param {String} tasksStatus 任务状态
   * @param {String} teamId 团队id
   * @param {String} teamName 团队名
   * @param {String} teamTelephone 团队电话
   * @param {String} manufacturerName 厂商名字
   * @param {String} builderName 师傅名字
   * @param {String} builderTelephone 师傅电话
   * @param {String} storeName 门店名
   * @param {String} passReason 不合格原因
   */
  editWkorder(param: IEdit) {
    return Request.post(Module.Work, '/operation/updateWoById', { ...param })
  },
  /**
   * 拆分工单
   * @param {String} wkorderId 工单ID
   * @param {Number} tasksStatus 工单状态
   * @param {String} teamName 团队名
   * @param {String} manufacturerName 厂商名
   * @param {String} storeName 门店名
   * @param {Array} splitWoListInfoDTOs 师傅集合
   */
  splitWorkOrder(param: ISplitWork) {
    return Request.post(Module.Work, '/operation/splitWorkOrder', { ...param })
  }
}
