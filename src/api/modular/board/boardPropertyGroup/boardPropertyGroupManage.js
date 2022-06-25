import { axios } from '@/utils/request'

/**
 * 查询属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupTree (parameter) {
  return axios({
    url: '/boardPropertyGroup/tree',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupPage (parameter) {
  return axios({
    url: '/boardPropertyGroup/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 属性分组列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupList (parameter) {
  return axios({
    url: '/boardPropertyGroup/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupAdd (parameter) {
  return axios({
    url: '/boardPropertyGroup/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupEdit (parameter) {
  return axios({
    url: '/boardPropertyGroup/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupDelete (parameter) {
  return axios({
    url: '/boardPropertyGroup/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupExport (parameter) {
  return axios({
    url: '/boardPropertyGroup/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

 /**
 * 导出属性分组
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:59:55
 */
export function boardPropertyGroupDetail (parameter) {
  return axios({
    url: '/boardPropertyGroup/detail',
    method: 'get',
    params: parameter
  })
}
