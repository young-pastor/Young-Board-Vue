import { axios } from '@/utils/request'

/**
 * 获取机构树
 *
 * @author Young-Pastor
 */
export function getOrgTree (parameter) {
  return axios({
    url: '/sysOrg/tree',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取机构列表
 *
 * @author Young-Pastor
 */
export function getOrgList (parameter) {
  return axios({
    url: '/sysOrg/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取机构列表
 *
 * @author Young-Pastor
 */
export function getOrgPage (parameter) {
  return axios({
    url: '/sysOrg/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 新增机构
 *
 * @author Young-Pastor
 */
export function sysOrgAdd (parameter) {
  return axios({
    url: '/sysOrg/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑机构
 *
 * @author Young-Pastor
 */
export function sysOrgEdit (parameter) {
  return axios({
    url: '/sysOrg/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除机构
 *
 * @author Young-Pastor
 */
export function sysOrgDelete (parameter) {
  return axios({
    url: '/sysOrg/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出系统机构
 *
 * @author Young-Pastor
 */
export function sysOrgExport (parameter) {
  return axios({
    url: '/sysOrg/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
