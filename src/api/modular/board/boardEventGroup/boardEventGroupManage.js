import { axios } from '@/utils/request'

/**
 * 查询元事件分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupPage (parameter) {
  return axios({
    url: '/boardEventGroup/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 元事件分组列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupList (parameter) {
  return axios({
    url: '/boardEventGroup/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加元事件分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupAdd (parameter) {
  return axios({
    url: '/boardEventGroup/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑元事件分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupEdit (parameter) {
  return axios({
    url: '/boardEventGroup/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除元事件分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupDelete (parameter) {
  return axios({
    url: '/boardEventGroup/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出元事件分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:21
 */
export function boardEventGroupExport (parameter) {
  return axios({
    url: '/boardEventGroup/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
