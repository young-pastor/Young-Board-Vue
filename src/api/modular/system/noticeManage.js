import { axios } from '@/utils/request'

/**
 * 查询系统通知公告
 *
 * @author young-pastor
 */
export function sysNoticePage (parameter) {
  return axios({
    url: '/sysNotice/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加系统通知公告
 *
 * @author young-pastor
 */
export function sysNoticeAdd (parameter) {
  return axios({
    url: '/sysNotice/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统通知公告
 *
 * @author young-pastor
 */
export function sysNoticeEdit (parameter) {
  return axios({
    url: '/sysNotice/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统通知公告
 *
 * @author young-pastor
 */
export function sysNoticeDelete (parameter) {
  return axios({
    url: '/sysNotice/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 通知公告详情
 *
 * @author young-pastor
 */
export function sysNoticeDetail (parameter) {
  return axios({
    url: '/sysNotice/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 修改状态
 *
 * @author young-pastor
 */
export function sysNoticeChangeStatus (parameter) {
  return axios({
    url: '/sysNotice/changeStatus',
    method: 'post',
    data: parameter
  })
}
