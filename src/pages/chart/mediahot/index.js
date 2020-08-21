import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { Look } from 'base/label'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Selects from 'components/Selects';
import Datapicker from 'components/Datapicker';
import Chart from 'containers/chart';
import News from 'components/News';
import './index.less'
const Mediahot = observer((props) => {
    const stores = useStores()
    const { MediaHotStore } = stores
    const { seldata } = MediaHotStore
    const onEvents = {
        'click': MediaHotStore.chartClick.bind(this)
    }
    return (
        <div>
            <header className="newstrends_head">
                <div className="head_left">
                    <div className="left_h3">媒体热度分析</div>
                    <Selects data={{ data: Look, img: true }} />
                </div>
                <div className="head_right">
                    <Datapicker
                        getData={MediaHotStore.getData}
                        style={{ width: 319 }}
                    />
                    <div className="right_sel">
                        {
                            [0, 1, 2, 3, 4, 5].map((item, index) => (
                                <div className={seldata.selval === index ? 'sel_box sel_active' : 'sel_box'} key={index} onClick={MediaHotStore.selactive.bind(this, item)}>
                                    <img src="/img/TreeViewIcon.svg" alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </header>
            <div className="newstrends_chart_view">
                <div className="view_chart">
                    <Chart
                        option={JSON.parse(sessionStorage.getItem('line'))}
                        style={{ width: '100%', height: '100%' }}
                        onEvents={onEvents}
                    />
                </div>
                <div className="view_line"></div>
                <div className="view_txt_media">
                    <div className="txt_thead">
                        <span>媒体类型</span>
                        <span>新闻量</span>
                        <span>占比</span>
                    </div>
                    <div className="txt_body">
                        {
                            [].map((item, index) => (
                                <div className="txt_thead" key={index}>
                                    <span>{}</span>
                                    <span>{}</span>
                                    <span>{}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <News data={{ category: ['分类', '来源媒体', '发布时间'], title: "相关内容", triangle: false, }} />
        </div>
    )
})

export default Mediahot