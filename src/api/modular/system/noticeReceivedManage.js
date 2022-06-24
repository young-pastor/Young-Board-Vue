import { axios } from '@/utils/request'

/**
 * 查询我收到的系统通知公告
 *
 * @author Young-Pastor
 */
export function sysNoticeReceived (parameter) {
  return axios({
    url: '/sysNotice/received',
    method: 'get',
    params: parameter
  })
}
