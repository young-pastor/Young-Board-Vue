import { axios } from '@/utils/request'

/**
 * 查询系统职位
 *
 * @author young-pastor
 */
export function sysPosPage (parameter) {
  return axios({
    url: '/sysPos/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 系统职位列表
 *
 * @author young-pastor
 */
export function sysPosList (parameter) {
  return axios({
    url: '/sysPos/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加系统职位
 *
 * @author young-pastor
 */
export function sysPosAdd (parameter) {
  return axios({
    url: '/sysPos/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统职位
 *
 * @author young-pastor
 */
export function sysPosEdit (parameter) {
  return axios({
    url: '/sysPos/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统职位
 *
 * @author young-pastor
 */
export function sysPosDelete (parameter) {
  return axios({
    url: '/sysPos/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出系统职位
 *
 * @author young-pastor
 */
export function sysPosExport (parameter) {
  return axios({
    url: '/sysPos/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
