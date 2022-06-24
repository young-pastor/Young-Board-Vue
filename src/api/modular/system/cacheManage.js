import { axios } from '@/utils/request'

/**
 * 获取缓存树
 *
 * @author Young-Pastor
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
 * @author Young-Pastor
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
 * @author Young-Pastor
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
 * @author Young-Pastor
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
 * @author Young-Pastor
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
 * @author Young-Pastor
 */
export function sysCacheClientsInfo (parameter) {
  return axios({
    url: '/sysCache/clientsInfo',
    method: 'get',
    data: parameter
  })
}
