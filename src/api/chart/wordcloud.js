import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 按条件搜索词云分析
     */
    searchCloud(params, head) {
        return http.post(`${api}/analysis/word/search/analysis`, params, head)
    },
    /**
    * 查询图表设置
    */
    getSetChart(params, head) {
        return http.get(`${api}/analysis/getSettings`, params, head)
    },

}