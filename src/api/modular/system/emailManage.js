import { axios } from '@/utils/request'

/**
 * 发送邮件
 *
 * @author Young-Pastor
 */
export function emailSendEmail (parameter) {
  return axios({
    url: '/email/sendEmail',
    method: 'post',
    data: parameter
  })
}

/**
 * 发送html邮件
 *
 * @author Young-Pastor
 */
export function emailSendEmailHtml (parameter) {
  return axios({
    url: '/email/sendEmailHtml',
    method: 'post',
    data: parameter
  })
}
