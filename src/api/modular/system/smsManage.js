import { axios } from '@/utils/request'

/**
 * 发送记录查询
 *
 * @author Young-Pastor
 */
export function smsPage (parameter) {
  return axios({
    url: '/sms/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 验证短信验证码
 *
 * @author Young-Pastor
 */
export function sysSendLoginMessage (parameter) {
  return axios({
    url: '/sms/sendLoginMessage',
    method: 'post',
    data: parameter
  })
}

/**
 * 验证短信验证码
 *
 * @author Young-Pastor
 */
export function sysValidateMessage (parameter) {
  return axios({
    url: '/sms/validateMessage',
    method: 'post',
    data: parameter
  })
}
