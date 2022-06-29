import { axios } from '@/utils/request'

/**
 * 查询数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTablePage(parameter) {
  return axios({
    url: '/boardTable/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 数据表配置列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableList(parameter) {
  return axios({
    url: '/boardTable/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableAdd(parameter) {
  return axios({
    url: '/boardTable/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableEdit(parameter) {
  return axios({
    url: '/boardTable/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableDelete(parameter) {
  return axios({
    url: '/boardTable/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableExport(parameter) {
  return axios({
    url: '/boardTable/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 导出数据表配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:42
 */
export function boardTableSync(parameter) {
  return axios({
    url: '/boardTable/sync',
    method: 'post',
    data: parameter
  })
}
