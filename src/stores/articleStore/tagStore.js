import { observable, action, toJS } from 'mobx'
import { articleApi } from 'api'
import { MediaTypeLabel } from 'base/label'
export class TagStore {
    @observable alldata = {
        selval: 0,
        visible: false,
        indeterminate: false,
        checkAll: false,
        newsval: 0,
        typeval: 0,
        mediaval: 0,
        options: MediaTypeLabel,
        pageinfo: {},
        categoryCheck: []
    }

    @observable categoryListId = []

    @observable listCounts = {}


    @action.bound
    async fetchcategoryList(params) {
        try {
            const res = await articleApi.categoryList(params)
            if (res.success) {
                const list = []
                res.data.map(item => list.push(item.categoryId))
                this.categoryListId = list
                sessionStorage.setItem('list', JSON.stringify(list))
                sessionStorage.setItem('category', JSON.stringify(res.data))
            }
        } catch (err) {

        }
    }

    @action.bound
    async fetchlistCount() {
        const option = {
            keyWord: "",
            status: -1, sort: 0,
            sourceType: -1,
            categoryIds: JSON.parse(sessionStorage.getItem("list")),
            "titleHit": false,
            "negative": -1,
            "isGroup": true,
            "original": -1,
            "sourceId": "",
            "startDate": "2018/08/07 00:00:00",
            "endDate": "2020/08/07 23:59:59",
            "dateType": 1,
            "lastModifyBy": "",
            "createBy": "",
            "fields": "articleId,title,titleForeign,releaseDate,sourceID,pageName,author,webURL,summary,summaryForeign,isCheck,original,highlight,negative,createBy,coverURL,hitCounts,categorySettingID,relevance,categoryId,top,lastModifyBy",
            "hitCounts": 1,
            "group_field": "articleRelevance.categoryId",
            "relevance": -1,
            "isTop": false,
            pIndex: this.alldata.pageinfo.pIndex || 1,
            pSize: this.alldata.pageinfo.pSize || 10
        }
        const head = {
            token: "640b37dc3efb1fe43c9cd4a232de1415",
        }
        try {
            const res = await articleApi.listCount(option, head)
            if (res.success) {
                this.listCounts = res.data
                sessionStorage.setItem("con", JSON.stringify(res.data))
            }
        } catch (err) {

        }
    }


    pageinfo = (obj) => {
        this.alldata.pageinfo = obj
        this.fetchlistCount()
    }

    checkList = e => {
        this.alldata.categoryCheck = e
    }

    @action.bound
    showDrawer = e => {
        this.alldata.visible = true
    }

    @action.bound
    onClose = e => {
        this.alldata.visible = false
    }

    @action.bound
    typeClick = e => {
        this.alldata.typeval = e.id
    }

    @action.bound
    newsClick = e => {
        this.alldata.newsval = e.id
    }

    @action.bound
    mediaClick = e => {
        this.alldata.mediaval = e.id
    }


    @action.bound
    check = list => {
        this.alldata.list = list
        this.alldata.indeterminate = !!list.length && list.length < this.alldata.options.length
        this.alldata.checkAll = list.length === this.alldata.options.length
    }

    @action.bound
    onCheckAllChange = e => {
        const idList = []
        const options = this.alldata.options
        for (let i in options) {
            idList.push(options[i].value)
        }
        this.alldata.list = e.target.checked ? idList : []
        this.alldata.indeterminate = false
        this.alldata.checkAll = e.target.checked
    };


}

