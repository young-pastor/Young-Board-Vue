import { axios } from '@/utils/request'

/**
 * 查询数据源配置表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourcePage (parameter) {
  return axios({
    url: '/boardDataSource/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 数据源配置表列表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourceList (parameter) {
  return axios({
    url: '/boardDataSource/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加数据源配置表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourceAdd (parameter) {
  return axios({
    url: '/boardDataSource/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑数据源配置表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourceEdit (parameter) {
  return axios({
    url: '/boardDataSource/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除数据源配置表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourceDelete (parameter) {
  return axios({
    url: '/boardDataSource/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出数据源配置表
 *
 * @author young-pastor
 * @date 2022-06-17 15:08:24
 */
export function boardDataSourceExport (parameter) {
  return axios({
    url: '/boardDataSource/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
