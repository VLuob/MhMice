import React, { useEffect } from 'react';
import { DownOutlined, } from '@ant-design/icons';
import { Look, editLabel, ChartYmdLabel, ChartViewLabel } from 'base/label'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Selects from 'components/Selects';
import Datapicker from 'components/Datapicker';
import Chart from 'containers/chart';
import News from 'components/News';
import './index.less'
import DownloadModal from 'containers/DownloadModal';
import Dropdown from 'components/Dropdown';
const Newstrends = observer((props) => {
    const stores = useStores()
    const { NewsTrendsStore } = stores
    const { seldata } = NewsTrendsStore
    const onEvents = {
        'click': NewsTrendsStore.chartClick.bind(this)
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
                        getData={NewsTrendsStore.getData}
                        style={{ width: 319 }}
                    />
                    <div className="right_sel">
                        {
                            ChartViewLabel.map((item, index) => (
                                <div className={seldata.selval === index ? 'sel_box sel_active' : 'sel_box'} key={index} onClick={NewsTrendsStore.selactive.bind(this, item)}>
                                    <img src={item.img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </header>
            <div className="newstrends_chart_view">
                <div className="newstrends_toolbox">
                    <div className="toolbox_year">
                        {
                            ChartYmdLabel.map(item => (
                                <li
                                    key={item.id}
                                    className={seldata.ymdval === item.id ? 'ymdactive' : ''}
                                    onClick={NewsTrendsStore.ymdClick.bind(this, item)}
                                >{item.name}</li>
                            ))
                        }
                    </div>
                    <DownloadModal />
                    <Dropdown name={"⋮"} data={editLabel} width={100} height={90} />
                </div>
                <Chart
                    option={''}
                    style={{ width: '100%', height: '100%' }}
                    onEvents={onEvents}
                />
            </div>
            <News data={{ category: ['分类', '来源媒体', '发布时间'], title: "相关内容", triangle: false, }} />
        </div>
    )
})

export default Newstrends