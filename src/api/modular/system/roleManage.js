import { axios } from '@/utils/request'

/**
 * 获取角色列表
 *
 * @author young-pastor
 */
export function getRolePage (parameter) {
  return axios({
    url: '/sysRole/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 增加角色
 *
 * @author young-pastor
 */
export function sysRoleAdd (parameter) {
  return axios({
    url: '/sysRole/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑角色
 *
 * @author young-pastor
 */
export function sysRoleEdit (parameter) {
  return axios({
    url: '/sysRole/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除角色
 *
 * @author young-pastor
 */
export function sysRoleDelete (parameter) {
  return axios({
    url: '/sysRole/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除角色
 *
 * @author young-pastor
 */
export function sysRoleDeteil (parameter) {
  return axios({
    url: '/sysRole/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取授权角色列表
 *
 * @author young-pastor
 */
export function sysRoleDropDown (parameter) {
  return axios({
    url: '/sysRole/dropDown',
    method: 'get',
    params: parameter
  })
}

/**
 * 拥有菜单
 *
 * @author young-pastor
 */
export function sysRoleOwnMenu (parameter) {
  return axios({
    url: '/sysRole/ownMenu',
    method: 'get',
    params: parameter
  })
}

/**
 * 授权菜单
 *
 * @author young-pastor
 */
export function sysRoleGrantMenu (parameter) {
  return axios({
    url: '/sysRole/grantMenu',
    method: 'post',
    data: parameter
  })
}

/**
 * 拥有数据
 *
 * @author young-pastor
 */
export function sysRoleOwnData (parameter) {
  return axios({
    url: '/sysRole/ownData',
    method: 'get',
    params: parameter
  })
}

/**
 * 授权数据
 *
 * @author young-pastor
 */
export function sysRoleGrantData (parameter) {
  return axios({
    url: '/sysRole/grantData',
    method: 'post',
    data: parameter
  })
}
