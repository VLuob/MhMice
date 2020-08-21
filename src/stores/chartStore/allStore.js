import { observable, action } from 'mobx'
import { allApi } from 'api'
export class AllStore {
    @observable alldata = {
        list: [],
        listchart: []
    }

    @action.bound
    async fetchgetSetChart(params, head) {
        try {
            const res = await allApi.getSetChart(params, head)
            if (res.success) {
                const setChartdata = res.data
                const line = JSON.parse(setChartdata[0].value)
                const mg = JSON.parse(sessionStorage.getItem('mg'))
                const mgcount = []
                const fmgcount = []
                const mgdate = []
                mg.map((item) => {
                    if (item.id == 2) {
                        mgcount.push(item.count)
                        line.chart.series[0].name = '敏感'
                        line.chart.series[0].data = mgcount
                    } else {
                        fmgcount.push(item.count)
                        line.chart.series[1].name = '非敏感'
                        line.chart.series[1].data = fmgcount
                    }
                    mgdate.push(item.date)
                    line.chart.xAxis[0].data = mgdate
                })
                setChartdata[0].value = line
            }
        } catch (err) {

        }

    }

    @action.bound
    async fetchanalysisCount(params, config) {
        try {
            const res = await allApi.analysisCount(params, config)
            if (res.success) {
                sessionStorage.setItem("mg", JSON.stringify(res.data))

            }
        } catch (err) {

        }

    }
}

