import { axios } from '@/utils/request'

/**
 * 系统属性监控
 *
 * @author Young-Pastor
 */
export function sysMachineQuery (parameter) {
  return axios({
    url: '/sysMachine/query',
    method: 'get',
    params: parameter
  })
}
