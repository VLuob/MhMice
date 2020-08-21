import React from 'react';
import { Tooltip, Checkbox } from 'antd';
import { sortLabel, Sensitivelabel } from 'base/label'
import './index.less'
import { keyRender } from 'utils/light.js'
import Paginations from 'components/Paginations'
import Selects from 'components/Selects';
import DownloadModal from 'containers/DownloadModal';
import MediaPopover from 'components/MediaPopover'
import { DownOutlined, SettingFilled, StarOutlined, IeOutlined, WechatOutlined, LinkOutlined, LineChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';
export default class News extends React.Component {
    state = {
        hide: true,
        list: JSON.parse(sessionStorage.getItem("con")),
        defaultList: [],
        checkAll: false,
        display: false,
    }
    target = () => {/* 折叠展开 */
        const hide = this.state.hide
        if (hide) {
            this.setState({
                hide: false
            })
        } else (
            this.setState({
                hide: true
            })
        )
    }
    show = (index, item) => {/* 子折叠展开 */
        if (!item.display) {
            item.display = true
        } else {
            item.display = false
        }
        this.setState({})
    }
    newCheckAll = e => {
        const newsIdlist = []
        if (!this.state.checkAll) {
            this.state.list.seach.forEach(i => {
                i.checked = true
                newsIdlist.push(i)
            })
        } else {
            this.state.list.seach.forEach(i => {
                i.checked = false
            })
        }
        this.setState({
            checkAll: e.target.checked,
            defaultList: e.target.checked ? newsIdlist : []
        })
    }
    newscheck = (item, index) => { /* 父标题单选 */
        const defaultList = this.state.defaultList
        if (!item.checked) {
            item.checked = true
            defaultList.push(item)
        } else {
            item.checked = false
            defaultList.splice(index, 1)
        }
        this.setState({
            checkAll: this.state.list.length === defaultList.length ? true : false,
            defaultList
        })
    }

    newsChildsCheck = item => {
    }
    componentDidMount() {

    }
    paging = (obj) => {
        const {
            pageinfo
        } = this.props.data
        this.setState({
            pageobj: obj
        })
        pageinfo &&
            pageinfo({
                pIndex: obj.currentpage,
                pSize: obj.pagecount
            })
    }
    DownLoadData = obj => {
        const {
            DownloadInfo
        } = this.props.data
        DownloadInfo && DownloadInfo({
            ...obj
        })
        console.log(obj)
    }
    render() {
        const { category, title, triangle, sort, test, detail, pageSize, allLength, selLength, savelabel } = this.props.data
        const { hide, checkAll, list, defaultList } = this.state
        return (
            <div className="news" >
                {
                    triangle && <div className="triangle"></div>
                }
                <div className="head">
                    <div className="title" onClick={this.target}>
                        <DownOutlined className={this.state.hide ? "top" : "under"} />
                        <span className='txt'>{title}</span>
                    </div>
                    <Checkbox onClick={(e) => { this.newCheckAll(e) }} checked={checkAll}>全选</Checkbox>
                    {
                        hide && sort && <div className="head_sort">
                            <Selects data={{ data: sortLabel }} />
                        </div>
                    }
                    <div className="news_refresh">
                        <Tooltip title="刷新数据">
                            <img src="/img/RefreshIcon.svg" alt="" />
                        </Tooltip>
                    </div>
                    <div className="news_download">
                        <DownloadModal
                            title={title}
                            getData={this.DownLoadData}
                            allLength={list && list.total /* allLength */ || 0}
                            selLength={defaultList && defaultList.length  /* selLength */ || 0}
                            savelabel={savelabel}
                        />
                    </div>
                </div>
                <div className={this.state.hide ? 'show' : 'hide'}>
                    <div className="set">
                        <div className='txt'>新闻列表</div>
                        <div className="screen">
                            <div className='screen_con'>
                                <span>{category && category[0] || '新闻分类'}</span>
                                <DownOutlined />
                            </div>
                            <div className='screen_con'>
                                <span>{category && category[1] || '来源媒体'}</span>
                                <DownOutlined />
                            </div>
                            <div className='screen_con'>
                                <span >{category && category[2] || '发布时间'}</span>
                                <DownOutlined />
                            </div>
                        </div>
                    </div>
                    {
                        list ? list.seach.map((item, index) => (
                            <div key={index}>
                                <div className="showview" >
                                    <div className="con" >
                                        <div className="con_txt">
                                            <span className="txt_num">·</span>
                                            <span className="icon">
                                                {
                                                    this.state.hide ? <IeOutlined /> : <WechatOutlined />
                                                }
                                            </span>
                                            <span className="unsensitive">
                                                {
                                                    this.state.hide ? <span>敏感</span> : <span ></span>
                                                }
                                            </span>
                                            <span className="text" >
                                                <Link to={"/article/detail?" + `${item._id}`} >
                                                    {
                                                        keyRender(item.title, "kfc")
                                                    }
                                                </Link>
                                                {
                                                    item.children &&
                                                    <span className="num"
                                                        onClick={this.show.bind(this, index, item)}
                                                    > {item.children && item.children.length}</span>
                                                }
                                            </span>
                                            <div className="more">
                                                <Tooltip title={"查看原文"}>
                                                    <a href={item.webURL} target="_blank" ><LinkOutlined /></a>
                                                </Tooltip>
                                                <Tooltip title={"收藏新闻"}>
                                                    <StarOutlined />
                                                </Tooltip>
                                                <Dropdown
                                                    data={Sensitivelabel}
                                                    icon
                                                    style={{ width: 100, height: 120 }}
                                                />
                                            </div>
                                            <span className={item.checked ? "checktrue" : "check"}>
                                                <Checkbox
                                                    checked={item.checked}
                                                    onClick={this.newscheck.bind(this, item, index)}
                                                />
                                            </span>
                                            {
                                                detail &&
                                                <Tooltip title={"点击查看媒体详情"}>
                                                    <span className="newdetail" style={item.children && { top: 30 }}>
                                                        <MediaPopover info={item.media} />
                                                    </span>
                                                </Tooltip>
                                            }
                                            {
                                                test &&
                                                <Tooltip title="点击可快速设置检测方案">
                                                    <span className="setting" style={item.children && { top: 30 }}><SettingFilled /></span>
                                                </Tooltip>
                                            }
                                        </div>
                                        {
                                            item.children &&
                                            <div className="detail" >
                                                <Checkbox
                                                    className="detail_btn"
                                                    onClick={(e) => { this.newCheckAll(e) }}
                                                    checked={checkAll}
                                                />
                                                <span>共有<span style={{ color: 'orange ' }}>{1}</span>条相似新闻，其中<span style={{ color: 'red' }}>{1}</span>条敏感信息
                                        <span className="look" onClick={this.show.bind(this, index, item)} >查看全部
                                            <DownOutlined className={item.display ? "top" : "under"} />
                                                    </span><LineChartOutlined /></span>
                                            </div>
                                        }
                                    </div>
                                    <div className="from">
                                        <span>外暖文职-文本</span>
                                        <span style={{ margin: '0 40px 0 20px' }}>[网络]和方位额
                                        </span>
                                        <span>4小时前</span>
                                    </div>
                                </div>
                                {
                                    item.display &&
                                    <div className="newschilds"  >
                                        {
                                            item.children && item.children.map((item, index) => (
                                                <div className="showview newchilds_list_style" key={index}>
                                                    <div className="con">
                                                        <div className="con_txt">
                                                            {
                                                                !item.checked &&
                                                                <span className="txt_num" >{index + 1}.</span>
                                                            }
                                                            <span className="icon">
                                                                {
                                                                    this.state.hide ? <IeOutlined /> : <WechatOutlined />
                                                                }
                                                            </span>
                                                            <span className="unsensitive">
                                                                {
                                                                    this.state.hide ? <span>敏感</span> : <span ></span>
                                                                }
                                                            </span>
                                                            <span style={{ fontSize: 14, color: "#000" }}>
                                                                {
                                                                    keyRender(item.title, "kfc")
                                                                }
                                                            </span>
                                                            <span className={item.checked ? "checktrue" : "check"}>
                                                                <Checkbox
                                                                    checked={item.checked}
                                                                    /* onClick={this.newsChildsCheck.bind(this, item)} */
                                                                    onClick={this.newscheck.bind(this, item, index)}
                                                                />
                                                            </span>
                                                            <div className="more" >
                                                                <Tooltip title={"查看原文"}>
                                                                    <a href={item.webURL} target="_blank" ><LinkOutlined /></a>
                                                                </Tooltip>
                                                                <Tooltip title={"收藏新闻"}>
                                                                    <StarOutlined />
                                                                </Tooltip>
                                                                <Dropdown
                                                                    data={Sensitivelabel}
                                                                    icon
                                                                    style={{ width: 100, height: 120 }}
                                                                />
                                                            </div>
                                                            {
                                                                detail &&
                                                                <Tooltip title={"点击查看媒体详情"}>
                                                                    <span
                                                                        className="newdetail"
                                                                        style={{ top: "15px" }}
                                                                    >
                                                                        <MediaPopover info={item.media} />
                                                                    </span>
                                                                </Tooltip>
                                                            }
                                                            {
                                                                test && <Tooltip title="点击可快速设置检测方案">
                                                                    <span className="setting" style={{ top: "15px" }}><SettingFilled /></span>
                                                                </Tooltip>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="from" >
                                                        <span>外暖文职-文本</span>
                                                        <span style={{ margin: '0 40px 0 20px' }}>[网络]和方位额</span>
                                                        <span>4小时前</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        )) : <div className="news_nodata">
                                <img src="/img/news_nodata.svg" alt="" />
                                <div className="nodata_text">暂无数据！</div>
                            </div>
                    }
                    {
                        list && <div className="pagin">
                            <Paginations total={{
                                totalpage: 20,
                                currentpage: pageSize && pageSize.pIndex || 1,
                                pagecount: pageSize && pageSize.pSize || 10,
                                paging: this.paging,
                            }} />
                        </div>
                    }

                </div >
            </div >
        )
    }

}