import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { reportRoute, } from 'base/label'
import './index.less'
import { Redirect } from "react-router";
import All from './all'
import Warnlog from './warnlog'
import Senderlog from './senderlog'
import Dropdown from 'components/Dropdown'
import { editLabel } from 'base/label'
const Report = observer((props) => {
    const stores = useStores()
    const { reportStore } = stores
    const { match } = props
    return (
        <div className="news_newslist" >
            <nav className="nav_tab">
                {
                    reportRoute.map((item, index) => (
                        <div className='tab_childs' key={index} >
                            <NavLink to={item.path} activeClassName="article_active">
                                <img src={item.icon} alt="" className="img" />
                                <div>{item.title} </div>
                            </NavLink>
                            {
                                item.id === 0 &&
                                [1, 2, 3].map(item => (
                                    < div className='tab_childs' key={index}>
                                        <NavLink to={`${match.url}/` + `${item}`} activeClassName="article_active">
                                            <img alt="" className="img" />
                                            <div>test</div>
                                            <div className="report_edit">
                                                <Dropdown name={"⋮"} data={editLabel} width={90} height={90} />
                                            </div>
                                        </NavLink>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </nav >
            <main className="article_main">
                <Route path={`${match.url}/all`} component={All} />
                <Route path={`${match.url}/senderlog`} component={Senderlog} />
                <Route path={`${match.url}/warnlog`} component={Warnlog} />
                {/* <Redirect exact from={`${match.url}`} to="/report/all" /> */}
            </main>
        </div >
    )
})

export default Report