import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { Look } from 'base/label'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useStores } from 'stores'
import Selects from 'components/Selects';
import Datapicker from 'components/Datapicker';
import Chart from 'containers/chart';
import { LineChart } from "components/DragLayout/chart";

import News from 'components/News';
import './index.less'
const Mediatype = observer((props) => {
    const stores = useStores()
    const { MediaTypeStore } = stores
    const { typedata } = MediaTypeStore
    const onEvents = {
        'click': MediaTypeStore.chartClick.bind(this)
    }
    useEffect(() => {
        searchCount()
        getSetChart()
        addChart()
    }, [])
    const searchParams = { sourceType: "微信" }
    const searchHead = { token: "640b37dc3efb1fe43c9cd4a232de1415" }
    const searchCount = async () => {
        await MediaTypeStore.fetchsearchCount(searchParams, searchHead)
    }
    const getSetChart = async () => {
        await MediaTypeStore.fetchgetSetChart({
            settingType: 1,
            token: "640b37dc3efb1fe43c9cd4a232de1415",
        })
    }

    const addChart = async () => {
        const arr = [ //5  //3pie //4tree //1line
            { settingType: 1, value: JSON.stringify(LineChart) }
        ]
        await MediaTypeStore.fetchAddchart(
            arr,
            {
                token: "a7b629a4244ea103b4130df4a4f94010",
                isOverride: true,
            })
    }
    return (
        < div >
            <header className="newstrends_head">
                <div className="head_left">
                    <div className="left_h3">媒体类型分析</div>
                    <Selects data={{ data: Look, img: true }} />
                </div>
                <div className="head_right">
                    <Datapicker
                        getData={MediaTypeStore.getData}
                        style={{ width: 319 }}
                    />
                    <div className="right_sel">
                        {
                            [0, 1, 2, 3, 4, 5].map((item, index) => (
                                <div className={typedata.selval === index ? 'sel_box sel_active' : 'sel_box'} key={index} onClick={MediaTypeStore.mediaclick.bind(this, item)}>
                                    <img src="/img/TreeViewIcon.svg" alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </header>
            <div className="newstrends_chart_view">
                <Chart
                    option={JSON.parse(sessionStorage.getItem("line"))}
                    style={{ width: '100%', height: '100%' }}
                    onEvents={onEvents}
                />
            </div>
            <News data={{ category: ['分类', '来源媒体', '发布时间'], title: "相关内容", triangle: false, }} />
        </div >
    )
})

export default Mediatype