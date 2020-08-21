import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 图表-删除图表设置
     */
    delChart(params, head) {
        return http.delete(`${api}/analysis/chart`, params, head)
    },
    /**
    * 查询图表设置
    */
    getSetChart(params, head) {
        return http.get(`${api}/analysis/getSettings`, params, head)
    },

}
