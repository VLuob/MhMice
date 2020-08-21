import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 图表-统计对应筛选条件下的某一维度的新闻数量
     */
    searchCount(params, head) {
        return http.post(`${api}/analysis/count`, params, head)
    },
    /**
    * 查询图表设置
    */
    getSetChart(params, head) {
        return http.get(`${api}/analysis/getSettings`, params, head)
    },

}