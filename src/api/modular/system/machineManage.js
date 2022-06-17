import { axios } from '@/utils/request'

/**
 * 系统属性监控
 *
 * @author young-pastor
 */
export function sysMachineQuery (parameter) {
  return axios({
    url: '/sysMachine/query',
    method: 'get',
    params: parameter
  })
}
