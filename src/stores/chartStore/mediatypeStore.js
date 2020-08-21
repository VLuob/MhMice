import { observable, action, toJS } from 'mobx'
import { MediatypeApi,allApi } from 'api'
export class MediaTypeStore {

    @observable typedata = {
        selval: 0,
        typelist: []
    }


    @action.bound
    fetchsearchCount = async (params, head) => {
        try {
            const res = await MediatypeApi.searchCount(params, head)
            if (res.success) {

            }
        } catch (err) {

        }
    }

    @action.bound
    async fetchAddchart(params, head) {
        const res = await allApi.addChart(params, head)
        if (res.success) {
        }
    }


    @action.bound
    fetchgetSetChart = async (params) => {
        try {
            const res = await MediatypeApi.getSetChart(params)
            if (res.success) {
                this.typedata.typelist = res.data
                const value = JSON.parse(res.data[0].value)
                const mg = JSON.parse(sessionStorage.getItem('mg'))
                const mgcount = []
                const fmgcount = []
                const mgdate = []
                mg.map((item) => {
                    if (item.id == 2) {
                        mgcount.push(item.count)
                        value.series[0].name = '敏感'
                        value.series[0].data = mgcount
                    } else {
                        fmgcount.push(item.count)
                        value.series[1].name = '非敏感'
                        value.series[1].data = fmgcount
                    }
                    mgdate.push(item.date)
                    value.xAxis[0].data = mgdate
                })
            }
        } catch (err) {

        }
    }

    @action.bound
    mediaclick = item => {
        this.seldata = {
            selval: item,
        }
    }
    @action.bound
    chartClick = e => {
    }
}

