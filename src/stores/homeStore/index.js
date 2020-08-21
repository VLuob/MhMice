import { observable, action, toJS } from 'mobx'
import { homeApi, userApi, allApi, wordcloudApi } from 'api'
import qs from 'qs'
const value = JSON.parse(sessionStorage.getItem('chart')) || []

export class HomeStore {

  @observable listData = {
    list: [],
    total: 0,
    terms: {},
    sdate: "",
    edate: "",
    token: "a7b629a4244ea103b4130df4a4f94010",
  }

  @observable chartData = {
    info: {},
    value: {}
  }

  @action.bound
  chartChange = (e) => {
    console.log(e)
  }

  @action.bound
  getData = (dates, dateStrings) => {
    this.listData.sdate = dateStrings[0]
    this.listData.edate = dateStrings[1]
    this.fetchanalysisCount()
    console.log(dateStrings)
  }

  @action.bound
  async fetchLogin(params) {
    const res = await userApi.userLogin(params)
    console.log(res)
  }

  @action.bound
  async fetcharticleList(params, head) {
    const response = await homeApi.articleList(params, head)
  }

  @action.bound
  async fetchgetSetChart(params, head) {
    try {
      const res = await allApi.getSetChart(params, head)
      if (res.success) {
        this.chartData.info = res || {}
        this.chartData.value = res.data[0].value || {}
        sessionStorage.setItem('chart', res.data[0].value)
      }
    } catch (err) {

    }

  }

  @action.bound
  async fetchanalysisCount(params, config) {
    try {
      const params = {
        token: this.listData.token,
        groupType: 1,
        displayDate: true,
        dateFormat: 2,
        isContrast: false,
        status: "0,1,2",
        sdate: this.listData.sdate || "2019/12/15 00:00:00",
        edate: this.listData.edate || "2020/08/11 23:59:00",
        categoryIds: JSON.stringify([
          "a451f25b-b2da-46b0-b727-87a69ce974b3",
          "dad1164e-e740-4800-9c8d-20f9d14d6a61",
          "babcbb82-2f52-462e-af5d-4d31aea0e653",
          "b56b5e5d-7436-4f90-8447-472625ff4d69",
          "b2164e86-22e7-476f-82bc-bda67dc4bf65"])//sessionStorage.getItem('list')
      }
      const res = await allApi.analysisCount(qs.stringify(params), config)
      if (res.success) {
        const line = value.filter(e => e.type == "line")
        const mg = res.data
        const mgdate = []
        mg.map(item => {
          mgdate.push(item.date)
          if (item.name == '敏感') {
            line[0].chart.series[0].name = item.name
            line[0].chart.series[0].data.push(item.count)

          } else {
            line[0].chart.series[1].name = item.name
            line[0].chart.series[1].data.push(item.count)
          }
        })
        line[0].chart.xAxis[0].data = mgdate.filter((el, index, self) => {
          return self.indexOf(el) === index
        })
        sessionStorage.setItem('chart', JSON.stringify(value))
      }
    } catch (err) {

    }

  }

  @action.bound
  async fetchsearchCloud() {
    const word = value.filter(e => e.type == "word")
    const option = {
      token: this.listData.token,
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
      }
      word[0].chart.series.data = data
      sessionStorage.setItem('chart', JSON.stringify(value))
    } catch (err) {

    }
  }


}

