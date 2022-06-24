import { axios } from '@/utils/request'

/**
 * 分页查询文件信息表
 *
 * @author Young-Pastor
 */
export function sysFileInfoPage (parameter) {
  return axios({
    url: '/sysFileInfo/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取全部文件信息表
 *
 * @author Young-Pastor
 */
export function sysFileInfoList (parameter) {
  return axios({
    url: '/sysFileInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 上传文件
 *
 * @author Young-Pastor
 */
export function sysFileInfoUpload (parameter) {
  return axios({
    url: '/sysFileInfo/upload',
    method: 'post',
    data: parameter
  })
}

/**
 * 下载文件
 *
 * @author Young-Pastor
 */
export function sysFileInfoDownload (parameter) {
  return axios({
    url: '/sysFileInfo/download',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 查看图片
 *
 * @author Young-Pastor
 */
export function sysFileInfoPreview (parameter) {
  return axios({
    url: '/sysFileInfo/preview',
    method: 'get',
    params: parameter,
    responseType: 'arraybuffer'
  })
}

/**
 * 查看详情文件信息表
 *
 * @author Young-Pastor
 */
export function sysFileInfoDetail (parameter) {
  return axios({
    url: '/sysFileInfo/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除文件信息表
 *
 * @author Young-Pastor
 */
export function sysFileInfoDelete (parameter) {
  return axios({
    url: '/sysFileInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取在线文档配置
 *
 * @author Young-Pastor
 */
export function sysFileInfoGetOnlineConfig (parameter) {
  return axios({
    url: '/sysFileInfo/getOnlineFileConfig',
    method: 'get',
    params: parameter
  })
}
