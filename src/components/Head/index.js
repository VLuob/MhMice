import React from 'react'
import { NavLink } from 'react-router-dom'
import { Path } from 'base/label'
import Moreset from 'components/Head/Moreset'
import Userinfo from 'components/Head/Userinfo'
import Downloads from 'components/Head/Downloads'
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
const Head = () => {
    return (
        < div id="head" >
            <div className="logo">
                <a href="/" >
                    <img src="http://msppic.meihua.info/FtHhIfHnqDUPfQEUI6gHSgvWulD-" />
                </a>
            </div>
            <div className="tab">
                {
                    Path.map((item, index) => (
                        <NavLink to={item.pathTo} key={index} activeClassName="active">{item.title}</NavLink>
                    ))
                }
            </div>
            <div className="setinfo">
                <main>
                    <SearchOutlined style={{ fontSize: "20px", color: "#FFF" }} />
                </main>
                <Moreset />
                <Downloads />
                <Userinfo />
            </div>
        </div >
    )
}
export default Head