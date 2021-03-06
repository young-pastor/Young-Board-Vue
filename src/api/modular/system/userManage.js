import { axios } from '@/utils/request'

/**
 * 获取用户列表
 *
 * @author Young-Pastor
 */
export function getUserPage (parameter) {
  return axios({
    url: '/sysUser/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 增加用户
 *
 * @author Young-Pastor
 */
export function sysUserAdd (parameter) {
  return axios({
    url: '/sysUser/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑用户
 *
 * @author Young-Pastor
 */
export function sysUserEdit (parameter) {
  return axios({
    url: '/sysUser/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户详情
 *
 * @author Young-Pastor
 */
export function sysUserDetail (parameter) {
  return axios({
    url: '/sysUser/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除用户
 *
 * @author Young-Pastor
 */
export function sysUserDelete (parameter) {
  return axios({
    url: '/sysUser/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出用户
 *
 * @author Young-Pastor
 */
export function sysUserExport (parameter) {
  return axios({
    url: '/sysUser/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 拥有角色
 *
 * @author Young-Pastor
 */
export function sysUserOwnRole (parameter) {
  return axios({
    url: '/sysUser/ownRole',
    method: 'get',
    params: parameter
  })
}

/**
 * 授权角色
 *
 * @author Young-Pastor
 */
export function sysUserGrantRole (parameter) {
  return axios({
    url: '/sysUser/grantRole',
    method: 'post',
    data: parameter
  })
}

/**
 * 拥有数据
 *
 * @author Young-Pastor
 */
export function sysUserOwnData (parameter) {
  return axios({
    url: '/sysUser/ownData',
    method: 'get',
    params: parameter
  })
}

/**
 * 授权数据
 *
 * @author Young-Pastor
 */
export function sysUserGrantData (parameter) {
  return axios({
    url: '/sysUser/grantData',
    method: 'post',
    data: parameter
  })
}

/**
 * 修改状态
 *
 * @author Young-Pastor
 */
export function sysUserChangeStatus (parameter) {
  return axios({
    url: '/sysUser/changeStatus',
    method: 'post',
    data: parameter
  })
}

/**
 * 重置密码
 *
 * @author Young-Pastor
 */
export function sysUserResetPwd (parameter) {
  return axios({
    url: '/sysUser/resetPwd',
    method: 'post',
    data: parameter
  })
}

/**
 * 修改密码
 *
 * @author Young-Pastor
 */
export function sysUserUpdatePwd (parameter) {
  return axios({
    url: '/sysUser/updatePwd',
    method: 'post',
    data: parameter
  })
}

/**
 * 用户选择器
 *
 * @author Young-Pastor
 */
export function sysUserSelector (parameter) {
  return axios({
    url: '/sysUser/selector',
    method: 'get',
    params: parameter
  })
}

/**
 * 修改头像
 *
 * @author Young-Pastor
 */
export function sysUserUpdateAvatar (parameter) {
  return axios({
    url: '/sysUser/updateAvatar',
    method: 'post',
    data: parameter
  })
}

/**
 * 更新基本信息
 *
 * @author Young-Pastor
 */
export function sysUserUpdateInfo (parameter) {
  return axios({
    url: '/sysUser/updateInfo',
    method: 'post',
    data: parameter
  })
}
