import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {
    /**
     * 新闻列表分类数量统计
     */
    listCount(params, head) {
        return http.post(`${api}/article/list`, params, head)
    },
    /**
    * 分类管理—前端分类列表
    */
    categoryList(params) {
        return http.get(`${api}/centre/front/category_list`, params)
    },

}
