import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import './index.less'
import qs from 'qs'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Dropdown from 'components/Dropdown';
import Selects from 'components/Selects';
import { Look } from 'base/label'
import Datapicker from 'components/Datapicker';
import DragLayout from 'components/DragLayout';
import News from 'components/News';
import { LineChart, PieChart, TreeChart } from "components/DragLayout/chart";

const All = observer((props) => {
    const stores = useStores()
    const { AllStore } = stores
    const { alldata } = AllStore
    useEffect(() => {
        getSetChart()
        analysisCount()
    }, [])

    const getSetChart = async () => {
        await AllStore.fetchgetSetChart({
            settingType: 0,
            token: "a7b629a4244ea103b4130df4a4f94010",

        })
    }
    const countParams = {
        token: "a7b629a4244ea103b4130df4a4f94010",
        groupType: 1,
        displayDate: true,
        dateFormat: 2,
        isContrast: false,
        status: "0,1,2",
        sdate: "2019/12/15 00:00:00",
        edate: "2020/08/11 23:59:00",
        categoryIds: JSON.stringify([
            "a451f25b-b2da-46b0-b727-87a69ce974b3",
            "dad1164e-e740-4800-9c8d-20f9d14d6a61",
            "babcbb82-2f52-462e-af5d-4d31aea0e653",
            "b56b5e5d-7436-4f90-8447-472625ff4d69",
            "b2164e86-22e7-476f-82bc-bda67dc4bf65"])
    }

    const analysisCount = async () => {
        await AllStore.fetchanalysisCount(qs.stringify(countParams))
    }
    return (
        <div>
            <header className="chart_head">
                <div className="chart_title">分析总览</div>
                <div className="chart_fun">
                    <Selects data={{ data: Look, img: true }} />
                    <Datapicker
                        getData={AllStore.getData}
                        style={{ width: 319 }}
                    />
                    <div className="fun_look">显示图标到看板</div>
                </div>
            </header>
            <div className="chart_show">
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">新闻总量</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">负面</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">平面</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">网络</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">微信</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">微博</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">论坛</span>
                </div>
                <div className="show_tab">
                    <span className="show_num">266</span>
                    <span className="show_txt">博客</span>
                </div>
            </div>
            <DragLayout
            />
            <News data={{ category: ['分类', '来源媒体', '发布时间'], title: "相关内容", triangle: true }} />
        </div>
    )
})

export default All