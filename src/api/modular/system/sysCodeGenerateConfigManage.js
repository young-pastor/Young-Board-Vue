import { axios } from '@/utils/request'

/**
 * 代码生成详细配置列表
 *
 * @author Young-Pastor
 */
export function sysCodeGenerateConfigList (parameter) {
  return axios({
    url: '/sysCodeGenerateConfig/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 编辑代码生成详细配置
 *
 * @author Young-Pastor
 */
export function sysCodeGenerateConfigEdit (parameter) {
  return axios({
    url: '/sysCodeGenerateConfig/edit',
    method: 'post',
    data: parameter
  })
}
