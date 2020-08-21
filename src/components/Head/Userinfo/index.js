import React from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd';
import './index.less'
class Userinfo extends React.Component {
    state = {
        visible: false,
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    render() {
        return (
            <Popover
                placement="bottomLeft"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                content={
                    < div className="user" >
                        <div className="name">
                            <h4>UserName<span>(系统管理员)</span></h4>
                            <div>UserName.user@meihua.info</div>
                        </div>
                        <div className="tab">
                            <li onClick={this.hide}><Link className="text" to='/news'>个人中心</Link></li>
                            <li onClick={this.hide}><Link className="text" to='/news'>切花到后台</Link></li>
                            <li onClick={this.hide}><Link className="text" to='/news'>退出</Link></li>
                        </div>
                    </ div >
                }
            >
                <main className="userinfo">
                    <span>UserName</span>
                    <img />
                </main>
            </Popover >
        )
    }
}
export default Userinfo