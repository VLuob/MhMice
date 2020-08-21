import React from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { newsRoute, } from 'base/label'
import './index.less'
import News from 'components/News';
import { toJS } from 'mobx';

const Category = observer((props) => {
    const stores = useStores()
    const { categoryStore } = stores
    const { alldata } = categoryStore
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

export default Category