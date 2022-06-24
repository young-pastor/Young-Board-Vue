import { axios } from '@/utils/request'

/**
 * 查询任务日志
 *
 * @author Young-Pastor
 * @date 2022-06-24 17:02:32
 */
export function sysTimersLogPage (parameter) {
  return axios({
    url: '/sysTimersLog/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除任务日志
 *
 * @author Young-Pastor
 * @date 2022-06-24 17:02:32
 */
export function sysTimersLogDelete (parameter) {
  return axios({
    url: '/sysTimersLog/delete',
    method: 'post',
    data: parameter
  })
}
