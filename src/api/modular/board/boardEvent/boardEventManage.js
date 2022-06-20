import { axios } from '@/utils/request'

/**
 * 查询元事件配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventPage (parameter) {
  return axios({
    url: '/boardEvent/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 元事件配置列表
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventList (parameter) {
  return axios({
    url: '/boardEvent/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加元事件配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventAdd (parameter) {
  return axios({
    url: '/boardEvent/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑元事件配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventEdit (parameter) {
  return axios({
    url: '/boardEvent/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除元事件配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventDelete (parameter) {
  return axios({
    url: '/boardEvent/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出元事件配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:17
 */
export function boardEventExport (parameter) {
  return axios({
    url: '/boardEvent/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
