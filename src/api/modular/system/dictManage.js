import { axios } from '@/utils/request'

/**
 * 分页查询系统字典类型
 *
 * @author Young-Pastor
 */
export function sysDictTypePage (parameter) {
  return axios({
    url: '/sysDictType/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加系统字典类型
 *
 * @author Young-Pastor
 */
export function sysDictTypeAdd (parameter) {
  return axios({
    url: '/sysDictType/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑系统字典类型
 *
 * @author Young-Pastor
 */
export function sysDictTypeEdit (parameter) {
  return axios({
    url: '/sysDictType/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除系统字典类型
 *
 * @author Young-Pastor
 */
export function sysDictTypeDelete (parameter) {
  return axios({
    url: '/sysDictType/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取字典类型下所有字典，举例，返回格式为：[{code:"M",value:"男"},{code:"F",value:"女"}]
 *
 * @author Young-Pastor
 */
export function sysDictTypeDropDown (parameter) {
  return axios({
    url: '/sysDictType/dropDown',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取所有字典，启动时加入缓存使用
 *
 * @author Young-Pastor
 */
export function sysDictTypeTree (parameter) {
  return axios({
    url: '/sysDictType/tree',
    method: 'get',
    params: parameter
  })
}
