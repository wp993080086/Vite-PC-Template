import { createAxiosExamples } from '@/servers/request'
const R = createAxiosExamples()
import { IDownloadFileReq } from '@/types/servers/files'

export default {
	/**
	 * @description 下载模板
	 * @param {string} propType 类型
	 * @param {string} projectId 项目ID
	 */
	downloadTemplate(data: IDownloadFileReq) {
		return R.get<null, Blob>('/api/biz/docx/template', { responseType: 'blob', params: data })
	}
}
