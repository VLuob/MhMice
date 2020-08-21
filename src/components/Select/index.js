import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import './index.less'
import SearchTree from '../SearchTree';
export default class Select extends React.Component {
    state = {
        visible: false
    }

    hide = item => {
        const { selClick } = this.props
        setTimeout(() => {
            selClick({
                ...item
            })
        })
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    render() {
        const {
            label,
            selClick,
            list,
            selShow,
            tree,
            data,
            categoryData,
            checkList,
            input
        } = this.props
        const { boxshow, visible } = this.state
        return (
            <Popover
                className="select_box"
                placement="bottom"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='ae'
                trigger="click"
                content={
                    <div className="Select_template">
                        {
                            !tree ? <div className="select_block">
                                {
                                    list && list.map((item, index) => (
                                        <div
                                            className="select_option"
                                            key={index} onClick={this.hide.bind(this, item)}
                                        >{item.label}</div>
                                    ))
                                }
                            </div>
                                :
                                <div className="select_block">
                                    <SearchTree
                                        param={{ width: 'auto', boxShadow: 'none', data: categoryData, input }}
                                        checkList={checkList}
                                    />
                                </div>
                        }
                    </div>
                }
            >
                <span className="select_val">{label || '请选择'} </span>
                <DownOutlined className="select_icon" />
            </Popover>
        )
    }

}

