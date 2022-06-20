import { axios } from '@/utils/request'

/**
 * 查询属性值
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValuePage (parameter) {
  return axios({
    url: '/boardPropertyValue/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 属性值列表
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValueList (parameter) {
  return axios({
    url: '/boardPropertyValue/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加属性值
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValueAdd (parameter) {
  return axios({
    url: '/boardPropertyValue/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑属性值
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValueEdit (parameter) {
  return axios({
    url: '/boardPropertyValue/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除属性值
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValueDelete (parameter) {
  return axios({
    url: '/boardPropertyValue/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出属性值
 *
 * @author young-pastor
 * @date 2022-06-20 12:00:01
 */
export function boardPropertyValueExport (parameter) {
  return axios({
    url: '/boardPropertyValue/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
