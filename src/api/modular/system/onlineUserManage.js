import { axios } from '@/utils/request'

/**
 * 在线用户列表
 *
 * @author Young-Pastor
 */
export function sysOnlineUserList (parameter) {
  return axios({
    url: '/sysOnlineUser/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 强制下线
 *
 * @author Young-Pastor
 */
export function sysOnlineUserForceExist (parameter) {
  return axios({
    url: '/sysOnlineUser/forceExist',
    method: 'post',
    data: parameter
  })
}
