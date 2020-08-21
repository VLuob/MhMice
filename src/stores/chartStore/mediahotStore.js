import { observable, action } from 'mobx'
import { articleApi } from 'api'
import { AuditOutlined } from '@ant-design/icons'
import { newsRoute } from 'base/label'
export class MediaHotStore {
    @observable seldata = {
        selval: 0,
    }
    @action.bound
    selactive = item => {
        this.seldata = {
            selval: item,
        }
    }

    @action.bound
    chartClick = e => {
    }
}

