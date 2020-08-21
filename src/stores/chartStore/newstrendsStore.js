import { observable, action } from 'mobx'
import { articleApi } from 'api'
import { AuditOutlined } from '@ant-design/icons'
import { newsRoute } from 'base/label'
export class NewsTrendsStore {
    @observable seldata = {
        selval: 0,
        ymdval: 0
    }
    @action.bound
    selactive = item => {
        this.seldata = {
            selval: item.id,
        }
    }

    @action.bound
    ymdClick = e => {
        this.seldata.ymdval = e.id
    }

    @action.bound
    chartClick = (e) => {
    }
}

