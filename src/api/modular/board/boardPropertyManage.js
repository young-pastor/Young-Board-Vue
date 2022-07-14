import { axios } from '@/utils/request'

/**
 * 查询属性配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyPage (parameter) {
  return axios({
    url: '/boardProperty/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 属性配置列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyAnalysisList (parameter) {
  return axios({
    url: '/boardProperty/analysisList',
    method: 'get',
    params: parameter
  })
}
/**
 * 元事件配置列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:52:17
 */
export function boardPropertyAutoCreate (parameter) {
  return axios({
    url: '/boardProperty/autoCreate',
    method: 'get',
    params: parameter
  })
}

/**
 * 属性配置列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyList (parameter) {
  return axios({
    url: '/boardProperty/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加属性配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyAdd (parameter) {
  return axios({
    url: '/boardProperty/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑属性配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyEdit (parameter) {
  return axios({
    url: '/boardProperty/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除属性配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyDelete (parameter) {
  return axios({
    url: '/boardProperty/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出属性配置
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:41
 */
export function boardPropertyExport (parameter) {
  return axios({
    url: '/boardProperty/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
