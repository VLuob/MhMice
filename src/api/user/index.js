import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 创建下载任务
     */
    download(params, head) {
        return http.post(`${api}/analysis/report/download`, params, head)

    },

    /**
   * 保存图表设置
   */

    saveSettings(params, head) {
        return http.post(`${api}/analysis/saveSettings`, params, head)
    },
    /**
     * 查询图表设置
     */

    getSettings(params) {
        return http.get(`${api}/analysis/getSettings`, params)
    }
}