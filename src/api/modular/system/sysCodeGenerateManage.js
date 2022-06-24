/**
 * 代码生成
 *
 * @author Young-Pastor
 */
import { axios } from '@/utils/request'

/**
 * 查询列表
 *
 * @author Young-Pastor
 */
export function codeGeneratePage (parameter) {
  return axios({
    url: '/codeGenerate/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 增加
 *
 * @author Young-Pastor
 */
export function codeGenerateAdd (parameter) {
  return axios({
    url: '/codeGenerate/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑
 *
 * @author Young-Pastor
 */
export function codeGenerateEdit (parameter) {
  return axios({
    url: '/codeGenerate/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除
 *
 * @author Young-Pastor
 */
export function codeGenerateDelete (parameter) {
  return axios({
    url: '/codeGenerate/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 查询当前数据库用户下的所有表
 *
 * @author Young-Pastor
 */
export function codeGenerateInformationList (parameter) {
  return axios({
    url: '/codeGenerate/InformationList',
    method: 'get',
    params: parameter
  })
}

/**
 * 本地生成
 *
 * @author Young-Pastor
 */
export function codeGenerateRunLocal (parameter) {
  return axios({
    url: '/codeGenerate/runLocal',
    method: 'post',
    data: parameter
  })
}

/**
 * 压缩包方式下载
 *
 * @author Young-Pastor
 */
export function codeGenerateRunDown (parameter) {
  return axios({
    url: '/codeGenerate/runDown',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 代码生产预览接口
 *
 * @author Young-Pastor
 */
export function codeGenerateRunFileContent (parameter) {
  return axios({
    url: '/codeGenerate/runFileContent',
    method: 'get',
    params: parameter
  })
}
