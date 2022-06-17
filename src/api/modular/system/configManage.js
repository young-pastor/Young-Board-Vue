import { axios } from '@/utils/request'

/**
 * 分页查询配置列表
 *
 * @author young-pastor
 */
export function sysConfigPage (parameter) {
  return axios({
    url: '/sysConfig/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加系统参数配置
 *
 * @author young-pastor
 */
export function sysConfigAdd (parameter) {
  return axios({
    url: '/sysConfig/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统参数配置
 *
 * @author young-pastor
 */
export function sysConfigEdit (parameter) {
  return axios({
    url: '/sysConfig/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统参数配置
 *
 * @author young-pastor
 */
export function sysConfigDelete (parameter) {
  return axios({
    url: '/sysConfig/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取字典类型下所有字典，举例，返回格式为：[{code:"M",value:"男"},{code:"F",value:"女"}]
 *
 * @author young-pastor
 */
export function sysDictTypeDropDown (parameter) {
  return axios({
    url: '/sysDictType/dropDown',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取系统的所有任务列表
 *
 * @author young-pastor
 */
export function sysTimersGetActionClasses (parameter) {
  return axios({
    url: '/sysTimers/getActionClasses',
    method: 'get',
    params: parameter
  })
}
