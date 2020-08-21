import React from 'react';
import { Popover } from 'antd';
import './index.less'
import { DownOutlined, } from '@ant-design/icons';
import { ViewLabel } from 'base/label'
export default class ViewTab extends React.Component {
    state = {
        visible: false,
        id: 0,
    }
    hide = (id) => {
        console.log(id)
        this.setState({
            visible: false,
            id
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    render() {
        const { id } = this.state
        return (
            <Popover
                placement="bottom"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='ae'
                content={
                    <div className="view_template">
                        <span>列表视图选项</span>
                        < div className="view_sel_box" >
                            {
                                ViewLabel.map((item, index) => (
                                    <div className={id === index ? 'sel_box_list active ' : 'sel_box_list'} key={index} onClick={this.hide.bind(this, item.id)}>
                                        <img src={item.img} alt="" className="sel_box_list_img" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                trigger="click"
            >
                <div className="view_txt">
                    <img src="/img/news_tab1.svg" alt="" className="view_img" />
                    <span>视图</span>
                    <DownOutlined />
                </div>
            </Popover>
        )
    }

}