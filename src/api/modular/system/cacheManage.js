import { axios } from '@/utils/request'

/**
 * 获取缓存树
 *
 * @author young-pastor
 */
export function sysCacheTree (parameter) {
  return axios({
    url: '/sysCache/keyTree',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取缓存树
 *
 * @author young-pastor
 */
export function sysCacheValue (parameter) {
  return axios({
    url: '/sysCache/queryValue',
    method: 'post',
    data: parameter
  })
}
/**
 * 新增缓存
 *
 * @author young-pastor
 */
export function sysCacheAdd (parameter) {
  return axios({
    url: '/sysCache/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑缓存
 *
 * @author young-pastor
 */
export function sysCacheEdit (parameter) {
  return axios({
    url: '/sysCache/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除缓存
 *
 * @author young-pastor
 */
export function sysCacheDelete (parameter) {
  return axios({
    url: '/sysCache/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取客户端信息
 *
 * @author young-pastor
 */
export function sysCacheClientsInfo (parameter) {
  return axios({
    url: '/sysCache/clientsInfo',
    method: 'get',
    data: parameter
  })
}
