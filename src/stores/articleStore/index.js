import { observable, action } from 'mobx'
import { articleApi } from 'api'
export class ArticleStore {
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

