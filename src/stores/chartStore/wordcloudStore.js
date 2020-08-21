import { observable, action } from 'mobx'
import { wordcloudApi, homeApi, allApi } from 'api'
export class WordCloudStore {
    @observable worddata = {
        list: [],
        sdate: "",
        edate: "",
        token: '640b37dc3efb1fe43c9cd4a232de1415',
        wordcloud: {}

    }
    @observable article = {
        list: [],
        keyword: ""
    }

    @action.bound
    getData = (dates, dateStrings) => {
        this.worddata.sdate = dateStrings[0]
        this.worddata.edate = dateStrings[1]
        this.fetchsearchCloud()
    }


    @action.bound
    async fetchgetSetChart(params, head) {
        try {
            const res = await allApi.getSetChart(params, head)
            if (res.success) {
                const setChart = res.data
                const word = JSON.parse(setChart[0].value)
                word.chart.series.data = this.worddata.list
                setChart[0].value = word
                this.worddata.wordcloud = setChart[0].value.chart
            }
        } catch (err) {

        }

    }

    @action.bound
    async fetchsearchCloud() {
        const option = {
            token: '640b37dc3efb1fe43c9cd4a232de1415',
            /*  sdate: this.worddata.sdate || "2020/07/03 12:30:00",
             edate: this.worddata.edate || "2020/07/03 12:30:00", */
        }
        try {
            const res = await wordcloudApi.searchCloud(option)
            const data = res.data || {}
            if (res.success) {
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i]
                    obj['name'] = obj['id']
                    obj['value'] = obj['count']
                    delete obj['id']
                    delete obj['count']
                }
                this.worddata.list = data || []
            }
        } catch (err) {

        }
    }

    @action.bound
    chartClick = e => {
        this.article.keyword = e.data.name
        this.fetchserchArticle()
    }

    @action.bound
    async fetchserchArticle() {
        const head = { token: '640b37dc3efb1fe43c9cd4a232de1415' }
        const params = {
            keyword: this.article.keyword,
            pIndex: 1,
            pSize: 10, status: -1, sort: 0,
            sourceType: -1,
            categoryIds: JSON.parse(sessionStorage.getItem("list")),
            "titleHit": false,
            "negative": -1,
            "isGroup": true,
            "original": -1,
            "sourceId": "",
            "pIndex": 1,
            "pSize": 1,
            "startDate": "2019/08/07 00:00:00",
            "endDate": "2020/08/07 23:59:59",
            "dateType": 1,
            "lastModifyBy": "",
            "createBy": "",
            "fields": "articleId,title,titleForeign,releaseDate,sourceID,pageName,author,webURL,summary,summaryForeign,isCheck,original,highlight,negative,createBy,coverURL,hitCounts,categorySettingID,relevance,categoryId,top,lastModifyBy",
            "hitCounts": 1,
            "group_field": "articleRelevance.categoryId",
            "relevance": -1,
            "isTop": false
        }
        try {
            const res = await homeApi.articleList(params, head)
        } catch (err) {

        }
    }
}

