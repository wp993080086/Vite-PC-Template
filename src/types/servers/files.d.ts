/**
 * @description 下载文件
 */
export interface IDownloadFileReq {
	projectId?: number
	propType?: string
}
/**
 * @description 上传文件
 */
export interface IUploadFileRes {
	size: number
	path: string
	name: string
	type: string
}
