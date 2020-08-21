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
import { TreeChart } from "components/DragLayout/chart";
import './index.less'
const tree = JSON.parse(sessionStorage.getItem("tree"))

const Emotion = observer((props) => {
    const stores = useStores()
    const { EmotionStore } = stores
    const { seldata } = EmotionStore
    const onEvents = {
        'click': EmotionStore.chartClick.bind(this)
    }
    return (
        <div>
            <header className="newstrends_head">
                <div className="head_left">
                    <div className="left_h3">新闻趋势分析</div>
                    <Selects data={{ data: Look, img: true }} />
                    <Selects data={{ data: Look, img: true }} />
                </div>
                <div className="head_right">
                    <Datapicker
                        getData={EmotionStore.getData}
                        style={{ width: 319 }}
                    />
                    <div className="right_sel">
                        {
                            [0, 1, 2].map((item, index) => (
                                <div className={seldata.selval === index ? 'sel_box sel_active' : 'sel_box'} key={index} onClick={EmotionStore.selactive.bind(this, item)}>
                                    <img src="/img/TreeViewIcon.svg" alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </header>
            <div className="newstrends_chart_view">
                <Chart
                    option={TreeChart}
                    style={{ width: '100%', height: '100%' }}
                    onEvents={onEvents}
                />
            </div>
            <News data={{ category: ['分类', '来源媒体', '发布时间'], title: "相关内容", triangle: false, }} />
        </div>
    )
})

export default Emotion