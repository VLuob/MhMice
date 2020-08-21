import React from 'react';
import { Popover } from 'antd';
import './index.less'
import { InfoCircleOutlined, } from '@ant-design/icons';
export default class MediaPopover extends React.Component {
    state = {
        visible: false
    }
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    render() {
        const { visible } = this.state
        const { info } = this.props
        return (
            <Popover
                placement="bottomLeft"
                visible={visible}
                onVisibleChange={this.handleVisibleChange}
                overlayClassName='ae'
                content={
                    <div className="Media_template" >
                        <div className="media_info">
                            <div>域名:<span>{info && info.url || "-"}</span></div>
                            <div>简介:<span>{info && info.sourceName || "-"}</span></div>
                            <div className="info_flex">
                                <div>类型:<span>{info && info.sourceType || "-"}</span></div>
                                <div className="third">等级:<span>{info && info.sourceNature || "-"}</span></div>
                            </div>
                            <div className="info_flex">
                                <div>月平均PV:<span>{info && info.pv || "-"}</span></div>
                                <div className="third">月平均UV:<span>{info && info.uv || "-"}</span></div>
                            </div>
                            <div className="info_flex">
                                <div>性质:<span>{info && info.siteLicense || "-"}</span></div>
                                <div className="third">行业:<span>{"综合"}</span></div>
                            </div>
                            <div>地区:<span>{info && info.province || "-"}</span></div>
                            <div>所属公司:<span>{info && info.companyName || "-"}</span></div>
                        </div>
                        <div className="media_line"></div>
                        <div className="media_sel">
                            <div>在当前结果中筛选属于此媒体的数据</div>
                            <div>查看此媒体下所有数据</div>
                        </div>
                    </div>
                }
                trigger="click"
            >
                <InfoCircleOutlined />
            </Popover >
        )
    }
}