import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { chartRoute, } from 'base/label'
import './index.less'
import { Redirect } from "react-router";
import Datapicker from 'components/Datapicker';
import All from './all'
import Emotion from './emotion'
import Mediahot from './mediahot'
import Mediatype from './mediatype'
import Newstrends from './newstrends'
import Region from './region'
import Wordcloud from './wordcloud'
import Singlenews from './singlenews'
import AddChart from 'containers/AddChart'
const Chart = observer((props) => {
    const stores = useStores()
    const { articleStore } = stores
    const { seldata } = articleStore
    const { match } = props
    return (
        <div className="news_newslist" >
            <nav className="nav_tab">
                {
                    chartRoute.map((item, index) => (
                        <div className='tab_childs' key={index} onClick={articleStore.selclick.bind(this, item, index)}>
                            <NavLink to={item.path} activeClassName="article_active">
                                <img src={item.icon} alt="" className="img" />
                                <div>{item.title} </div>
                                {
                                    index !== 0 && index !== 4 && index !== 5 &&
                                    <DownOutlined className={seldata.index === index ? 'tab_childs_icon  top' : 'tab_childs_icon under '} />
                                }
                            </NavLink>
                            {
                                seldata.index === 1 && index === 1 &&
                                [1, 2].map(item => (
                                    <NavLink to={"/chart/newstrends/" + `${item}`} activeClassName="article_active" key={item}>
                                        <div className="tab_childs_content">{item}</div>
                                    </NavLink>
                                ))

                            }
                        </div>
                    ))
                }
                <div className="creat_chart">
                    <AddChart param={{ icon: false, b: 1 }} title={''} />
                    <div className="creat_txt"><span className="creta_add">+</span>新建图表</div>
                </div>
            </nav >
            <main className="article_main">
                <Route path={`${match.url}/all`} component={All} />
                <Route path={`${match.url}/newstrends`} component={Newstrends} />
                <Route path={`${match.url}/emotion`} component={Emotion} />
                <Route path={`${match.url}/mediahot`} component={Mediahot} />
                <Route path={`${match.url}/mediatype`} component={Mediatype} />
                <Route path={`${match.url}/region`} component={Region} />
                <Route path={`${match.url}/wordcloud`} component={Wordcloud} />
                <Route path={`${match.url}/singlenews`} component={Singlenews} />
                <Redirect exact from={`${match.url}`} to="/chart/all" />
            </main>
        </div >
    )
})

export default Chart