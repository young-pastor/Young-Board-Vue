/**
 * 系统应用
 *
 * @author Young-Pastor
 */
import { axios } from '@/utils/request'

/**
 * 系统应用列表
 *
 * @author Young-Pastor
 */
export function getAppPage (parameter) {
  return axios({
    url: '/sysApp/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 系统应用列表
 *
 * @author Young-Pastor
 */
export function getAppList (parameter) {
  return axios({
    url: '/sysApp/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 新增系统应用
 *
 * @author Young-Pastor
 */
export function sysAppAdd (parameter) {
  return axios({
    url: '/sysApp/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统应用
 *
 * @author Young-Pastor
 * @param parameter
 * @returns {*}
 */
export function sysAppEdit (parameter) {
  return axios({
    url: '/sysApp/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统应用
 *
 * @author Young-Pastor
 */
export function sysAppDelete (parameter) {
  return axios({
    url: '/sysApp/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 设为默认应用
 *
 * @author Young-Pastor
 */
export function sysAppSetAsDefault (parameter) {
  return axios({
    url: '/sysApp/setAsDefault',
    method: 'post',
    data: parameter
  })
}
