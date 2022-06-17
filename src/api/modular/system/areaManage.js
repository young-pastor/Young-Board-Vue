import { axios } from '@/utils/request'

/**
 * 获取区域列表
 *
 * @author young-pastor
 * @param parameter
 * @returns {*}
 */
export function getAreaList (parameter) {
  return axios({
    url: '/sysArea/list',
    method: 'get',
    params: parameter
  })
}
