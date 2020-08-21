import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 图表-新增、编辑图表、查询图表设置
     */
    addChart(params, head,) {
        return http.post(`${api}/analysis/chart`, params, head)
    },
    /**
    * 查询图表设置
    */
    getSetChart(params, head) {
        return http.get(`${api}/analysis/getSettings`, params, head)
    },
    /**
     * 图表-统计对应筛选条件下的某一维度的新闻数量
     */
    analysisCount(params, head, config) {
        return http.post(`${api}/analysis/count`, params, head)
    }
}
