import React, { useEffect } from 'react';
import { Look } from 'base/label'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Selects from 'components/Selects';
import Datapicker from 'components/Datapicker';
import Chart from 'containers/chart';
import News from 'components/News';
import './index.less'
const Wordcloud = observer((props) => {
    const stores = useStores()
    const { WordCloudStore } = stores
    const { worddata } = WordCloudStore
    useEffect(() => {
        searchCloud()
        serchArticle()
        getSetChart()
    }, [])
    const searchCloud = async () => {
        await WordCloudStore.fetchsearchCloud()
    }

    const serchArticle = async () => {
        await WordCloudStore.fetchserchArticle()
    }

    const getSetChart = async () => {
        await WordCloudStore.fetchgetSetChart({
            settingType: 5,
            token: "640b37dc3efb1fe43c9cd4a232de1415",
        })
    }
    const onEvents = {
        'click': WordCloudStore.chartClick.bind(this)
    }
    return (
        <div>
            <header className="newstrends_head">
                <div className="head_left">
                    <div className="left_h3">热门词云分析</div>
                    <Selects data={{ data: Look, img: true }} />
                </div>
                <div className="head_right">
                    <Datapicker
                        getData={WordCloudStore.getData}
                        style={{ width: 319 }}
                    />
                </div>
            </header>
            <div className="newstrends_chart_view">
                <div className="view_chart">
                    <Chart
                        option={worddata.wordcloud}
                        style={{ width: '100%', height: '90%' }}
                        onEvents={onEvents}
                    />
                </div>
                <div className="view_line"></div>
                <div className="view_txt_media">
                    <div className="txt_thead">
                        <span>关键词</span>
                        <span>词汇量</span>
                    </div>
                    <div className="txt_body">
                        {
                            worddata.list.map((item, index) => (
                                <div className="txt_thead" key={index}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
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

export default Wordcloud