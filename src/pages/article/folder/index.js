import React from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { newsRoute, } from 'base/label'
import './index.less'
import News from 'components/News';
const Folder = (props) => {

    return (
        <div>
            <News data={{ category: ['检测方案', '来源媒体', '发布时间'],}}/>
        </div>
    )
}

export default Folder