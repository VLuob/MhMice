import React from 'react'
import { LeftOutlined, RightOutlined, MoreOutlined, ShareAltOutlined, MailOutlined, StarOutlined, LineChartOutlined, DeleteOutlined } from '@ant-design/icons';

import './index.less'

const SwiperCard = ((props) => {
    console.log(props.state)
    return (
        <div className="swiper">
            <div className="set">
                <div className="set_left">
                    <div className="bestnew">最新新闻</div>
                    <div>实时新闻</div>
                    <div>全部分类</div>
                </div>
                <div className="set_right">
                    <div className="bestnew"><MoreOutlined /></div>
                    <div><ShareAltOutlined /></div>
                    <div><LeftOutlined /> <RightOutlined /></div>
                </div>
            </div>
            <div className="box">
                <div className="cardlist">
                    {
                        [1, 2, 3, 4].map(index => (
                            <div className="card" key={index}>
                                <img />
                                <div className="con">
                                    <h3>城住宅则混更为白各分城住宅则混更为白各分各分</h3>
                                    <span className="text">
                                        城住宅则混更为白各分城住宅则混更为
                                        白各分各分城住宅则混更为白
                                        各分城住宅则混更为白各分各分城住宅则
                            </span>
                                </div>
                                <div className="info">
                                    <span>一点资讯</span>
                                    <span>20分钟前</span>
                                </div>
                                <div className="fun">
                                    <span><MailOutlined /></span>
                                    <span><StarOutlined /></span>
                                    <span><LineChartOutlined /></span>
                                    <span><DeleteOutlined /></span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
})
export default SwiperCard