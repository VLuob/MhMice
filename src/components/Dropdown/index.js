import React from 'react';
import { Popover, Tooltip } from 'antd';
import './index.less'
import { MoreOutlined } from '@ant-design/icons';

export default class Dropdown extends React.Component {
    state = {
        visible: false,
    }
    hide = id => {
        const hide = this.props.hide
        this.setState({
            visible: false,
            id
        });
        hide && hide({
            ...id
        })
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    render() {
        const { data, icon, style } = this.props
        return (
            <Popover
                placement="bottom"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='ae'
                content={
                    <div className="template" style={style}>
                        {
                            data && data.map((item, index) => (
                                < div className="tablist" key={index} onClick={this.hide.bind(this, item.id)}>{item.name}</div>
                            ))
                        }
                    </div>
                }
                trigger="click"
            >
                {
                    !icon ?
                        this.props.name :
                        <Tooltip title={"更多操作"}>
                            <MoreOutlined />
                        </Tooltip>
                }
            </Popover>
        )
    }

}