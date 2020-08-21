import { observable, action } from 'mobx'

import { articleApi } from 'api'
import { AuditOutlined } from '@ant-design/icons'
import { newsRoute } from 'base/label'
export class ChartStore {
    @observable seldata = {
        index: 0,
    }
    @action.bound
    selclick = (e, i) => {

        this.seldata = {
            index: i,
        }
    }
    @action.bound
    checkAll = e => {
    }

}

