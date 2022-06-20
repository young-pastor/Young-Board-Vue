import { axios } from '@/utils/request'

/**
 * 查询数据字段配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnPage (parameter) {
  return axios({
    url: '/boardTableColumn/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 数据字段配置列表
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnList (parameter) {
  return axios({
    url: '/boardTableColumn/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加数据字段配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnAdd (parameter) {
  return axios({
    url: '/boardTableColumn/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑数据字段配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnEdit (parameter) {
  return axios({
    url: '/boardTableColumn/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除数据字段配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnDelete (parameter) {
  return axios({
    url: '/boardTableColumn/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出数据字段配置
 *
 * @author young-pastor
 * @date 2022-06-20 11:52:01
 */
export function boardTableColumnExport (parameter) {
  return axios({
    url: '/boardTableColumn/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
