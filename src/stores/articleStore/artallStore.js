import { observable, action } from 'mobx'
import { articleApi, userApi } from 'api'
import { MediaTypeLabel } from 'base/label'
import { message } from 'utils'
import qs from 'qs'
export class ArtallStore {
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
        Downloadinfo: {},
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
        const page = JSON.parse(sessionStorage.getItem('pageinfo'))
        const params = {
            keyWord: "",
            status: -1, sort: 0,
            sourceType: -1,
            categoryIds: null, //JSON.parse(sessionStorage.getItem("list")),
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
            pIndex: page && page.pIndex || 1,
            pSize: page && page.pSize || 10
        }
        const head = {
            token: "640b37dc3efb1fe43c9cd4a232de1415",
        }
        console.log()
        try {
            const res = await articleApi.listCount(params, head)
            if (res.success) {
                this.listCounts = res.data
                sessionStorage.setItem("con", JSON.stringify(res.data))
            }
        } catch (err) {

        }
    }

    pageinfo = (obj) => {
        this.alldata.pageinfo = obj
        sessionStorage.setItem('pageinfo', JSON.stringify(obj))
        this.fetchlistCount()
    }

    DownloadInfo = async (obj) => {
        const fields_cn = obj.selectList.map(item => item.label).toString()
        const fields = obj.selectList.map(item => item.en).toString()
        const body = {
            "sourceType": ["-1"],
            "titleHit": "false",
            "negative": "-1",
            "isGroup": "true",
            "original": "-1",
            "keyWord": "",
            "idf": "#idf",
            "categoryIds": [
                "a451f25b-b2da-46b0-b727-87a69ce974b3",
                "dad1164e-e740-4800-9c8d-20f9d14d6a61",
                "babcbb82-2f52-462e-af5d-4d31aea0e653",
                "b56b5e5d-7436-4f90-8447-472625ff4d69",
                "b2164e86-22e7-476f-82bc-bda67dc4bf65"
            ],
            "tagIds": [],
            "sourceId": "",
            "pIndex": 1,
            "pSize": 10,
            "sdate": "2020/04/24 11:00",
            "edate": "2020/04/26 11:00",
            "dateType": 1,
            "lastModifyBy": "",
            "createBy": "",
            fields,
            "hitCounts": "1",
            "token": "bc48d791aa769ef1f49868580857c165",
            "group_field": "articleRelevance.categoryId",
            "status": "0,1,2",
            "sort": "1",
            "relevance": "-1",
            fields_cn,
            "reminderMail": obj.emailval,
            "miceURL": "http://medihealcosv3.meihua.info/article/details?i=#articleId",
            "username": "dora.cao1205"
        }
        const params = {
            taskName: obj.taskname,
            taskType: 1,
            status: 1,
            params: JSON.stringify(body)
        }
        await userApi.download(params, { token: "640b37dc3efb1fe43c9cd4a232de1415", })
    }


    savelabel = async (e) => {
        try {
            const value = { name: e.namelabel, data: e.selectList }
            const payload = {
                settingType: 20,
                value: JSON.stringify(value)
            }
            const params = [
                payload
            ]
            const res = await userApi.saveSettings(params, {
                token: "640b37dc3efb1fe43c9cd4a232de1415",
                isOverride: true,
            })
            if (res) {
                message.success("保存成功")
            }
            console.log(e,)
        } catch (error) {

        }


    }

    @action.bound
    async fetchgetSettings() {
        try {
            const res = await userApi.getSettings({
                token: "640b37dc3efb1fe43c9cd4a232de1415",
                settingType: 20,
            })
            if (res.success) {
                sessionStorage.setItem("sellist", res.data[0].value)
            }
            console.log(res)
        } catch (error) {

        }

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

