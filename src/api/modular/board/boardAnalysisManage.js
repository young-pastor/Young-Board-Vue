import { axios } from '@/utils/request'

/**
 * 查询实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisPage (parameter) {
  return axios({
    url: '/boardAnalysis/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 实时分析列表
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisList (parameter) {
  return axios({
    url: '/boardAnalysis/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisAdd (parameter) {
  return axios({
    url: '/boardAnalysis/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisEdit (parameter) {
  return axios({
    url: '/boardAnalysis/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisDelete (parameter) {
  return axios({
    url: '/boardAnalysis/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisExport (parameter) {
  return axios({
    url: '/boardAnalysis/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 导出实时分析
 *
 * @author Young-Pastor
 * @date 2022-06-20 11:51:00
 */
export function boardAnalysisAnalysisById (parameter) {
  return axios({
    url: '/boardAnalysis/analysisById',
    method: 'post',
    data: parameter
  })
}
