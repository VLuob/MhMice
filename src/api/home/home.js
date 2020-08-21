import { config, http } from 'utils'

const api = config.API_DOMAIN

export default {

  articleList(params, head) {
    return http.post(`${api}/article/list`, params, head)

  }
}