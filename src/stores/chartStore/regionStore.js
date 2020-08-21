import { observable, action } from 'mobx'
import { allApi } from 'api'
import { AuditOutlined } from '@ant-design/icons'
import { newsRoute } from 'base/label'
export class RegionStore {
    @observable seldata = {
        selval: 0,
        chartinfo: {}
    }

    @action.bound
    selactive = item => {
        this.seldata = {
            selval: item,
        }
    }

    @action.bound
    async fetchgetSetChart(params, head) {
        try {
            const res = await allApi.getSetChart(params, head)
            if (res.success) {

                const setChart = res.data
                const map = JSON.parse(setChart[0].value)
                setChart[0].value = map
                console.log(setChart)
                this.seldata.chartinfo = setChart
            }
        } catch (err) {

        }

    }

    @action.bound
    chartClick = e => {
    }
}

