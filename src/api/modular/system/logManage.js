import { axios } from '@/utils/request'

/**
 * 查询访问日志
 *
 * @author young-pastor
 */
export function sysVisLogPage (parameter) {
  return axios({
    url: '/sysVisLog/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询操作日志
 *
 * @author young-pastor
 */
export function sysOpLogPage (parameter) {
  return axios({
    url: '/sysOpLog/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 清空访问日志
 *
 * @author young-pastor
 */
export function sysVisLogDelete (parameter) {
  return axios({
    url: '/sysVisLog/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 清空登录日志
 *
 * @author young-pastor
 */
export function sysOpLogDelete (parameter) {
  return axios({
    url: '/sysOpLog/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出登录日志
 *
 * @author young-pastor
 */
export function sysVisLogExport (parameter) {
  return axios({
    url: '/sysVisLog/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 导出操作日志
 *
 * @author young-pastor
 */
export function sysOpLogExport (parameter) {
  return axios({
    url: '/sysOpLog/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
