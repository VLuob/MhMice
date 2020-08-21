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
import { MapChart } from "components/DragLayout/chart";
import './index.less'
const Region = observer((props) => {
    const stores = useStores()
    const { RegionStore } = stores
    const { seldata } = RegionStore

    useEffect(() => {
        getSetChart()
    }, [])

    const onEvents = {
        'click': RegionStore.chartClick.bind(this)
    }

    const getSetChart = async () => {
        await RegionStore.fetchgetSetChart({
            settingType: 4,
            token: "640b37dc3efb1fe43c9cd4a232de1415",
        })
    }

    return (
        <div>
            <header className="newstrends_head">
                <div className="head_left">
                    <div className="left_h3">地区分析</div>
                    <Selects data={{ data: Look, img: true }} />
                </div>
                <div className="head_right">
                    <Datapicker
                        getData={RegionStore.getData}
                        style={{ width: 319 }}
                    />
                </div>
            </header>
            <div className="newstrends_chart_view">
                <div className="view_chart">
                    <Chart
                        option={MapChart}
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
                    {console.log()}
                    <div className="txt_body">
                        {
                            MapChart.series[0].data.map((item, index) => (
                                <div className="txt_thead" key={index}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                                    <span>{item.value / 20 + "%"}</span>
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

export default Region