import { axios } from '@/utils/request'

/**
 * 获取菜单列表
 *
 * @author Young-Pastor
 * @param parameter
 * @returns {*}
 */
export function getMenuList (parameter) {
  return axios({
    url: '/sysMenu/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取系统菜单树，用于新增，编辑时选择上级节点
 *
 * @author Young-Pastor
 */
export function getMenuTree (parameter) {
  return axios({
    url: '/sysMenu/tree',
    method: 'get',
    params: parameter
  })
}

/**
 * 增加菜单
 *
 * @author Young-Pastor
 */
export function sysMenuAdd (parameter) {
  return axios({
    url: '/sysMenu/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 增加菜单
 *
 * @author Young-Pastor
 */
export function sysMenuDelete (parameter) {
  return axios({
    url: '/sysMenu/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看菜单详情
 *
 * @author Young-Pastor
 */
export function sysMenuDetail (parameter) {
  return axios({
    url: '/sysMenu/detail',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统菜单
 *
 * @author Young-Pastor
 */
export function sysMenuEdit (parameter) {
  return axios({
    url: '/sysMenu/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取系统菜单树，用于给角色授权时选择
 *
 * @author Young-Pastor
 */
export function SysMenuTreeForGrant (parameter) {
  return axios({
    url: '/sysMenu/treeForGrant',
    method: 'get',
    params: parameter
  })
}

/**
 * 根据系统切换菜单
 *
 * @author Young-Pastor
 */
export function sysMenuChange (parameter) {
  return axios({
    url: '/sysMenu/change',
    method: 'post',
    data: parameter
  })
}
