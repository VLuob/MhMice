import React from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { newsRoute, } from 'base/label'
import './index.less'
import { toJS } from 'mobx';
import News from 'components/News';
const Tag = observer((props) => {
    const stores = useStores()
    const { tagStore } = stores
    const { alldata } = tagStore
    const list = toJS(alldata.categoryCheck.list)
    return (
        <div>
            {
                list && list.map((item, index) => (
                    <News
                        data={{ category: ['检测方案', '来源媒体', '发布时间'], title: item }}
                        key={index}
                    />
                ))
            }
        </div>
    )
})

export default Tag