import { axios } from '@/utils/request'

/**
 * 查询字段关联配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectPage (parameter) {
  return axios({
    url: '/boardTableConnect/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 字段关联配置列表
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectList (parameter) {
  return axios({
    url: '/boardTableConnect/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加字段关联配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectAdd (parameter) {
  return axios({
    url: '/boardTableConnect/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑字段关联配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectEdit (parameter) {
  return axios({
    url: '/boardTableConnect/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除字段关联配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectDelete (parameter) {
  return axios({
    url: '/boardTableConnect/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出字段关联配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:07
 */
export function boardTableConnectExport (parameter) {
  return axios({
    url: '/boardTableConnect/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
