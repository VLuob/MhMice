import React, { Component } from 'react'
import style from './index.less'
export default class Paginations extends Component {
    constructor(props) {
        super(props)
        let {
            currentpage,
            pagecount,
        } = this.props.total
        this.state = {
            currentpage: currentpage || 1,//当前页码,  /* 1-7省略号 倒数两个页码 */
            startpage: 1,//开头页码     /* 8-14省略号 倒数两个页码 */
            groupcount: 3,//省略号前的数据条数
            pagecount: pagecount || 10,//一页默认显示条数
        }
    }
    create() {
        const {
            totalpage,
        } = this.props.total;
        const {
            currentpage,
            startpage,
            groupcount
        } = this.state
        let page = [];
        page.push(<li key={0} onClick={this.goPrev.bind(this)} className={this.state.currentpage === 1 ? "nomore" : ""}>上一页</li >)
        if (currentpage >= 4) {
            page.push(<li key={1} onClick={this.go.bind(this, 1)} className={this.state.currentpage === 1 ? "active" : ""}>1</li >)
            page.push(<li className="ellipsis" key={2}>...</li>)
        }
        for (let i = startpage; i <= groupcount + startpage; i++) {
            if (i <= totalpage - 2) {
                page.push(<li key={i} onClick={this.go.bind(this, i)} className={this.state.currentpage === i ? "active" : ""}>{i}</li>)
            }
        }
        //中间省略部分  
        if (totalpage - startpage >= 9) {
            page.push(<li className="ellipsis" key={-1}>...</li>)
        }
        //倒数一二页
        page.push(<li className={this.state.currentpage === totalpage - 1 ? "active" : ""} onClick={this.go.bind(this, totalpage - 1)} key={totalpage - 1}>{totalpage - 1}</li>)
        page.push(<li className={this.state.currentpage === totalpage ? "active" : ""} onClick={this.go.bind(this, totalpage)} key={totalpage}>{totalpage}</li>)
        page.push(<li key={totalpage + 1} onClick={this.goNext.bind(this)} className={this.state.currentpage === totalpage ? "nomore" : ""}>下一页</li >)
        return page
    }
    //更新当前点击页码
    go(currentpage) {
        const {
            groupcount,
        } = this.state
        const {
            totalpage,
            paging
        } = this.props.total
        //上一页
        if (currentpage % groupcount === 1) {
            this.setState({
                startpage: currentpage
            })
        }
        //下一页
        if (currentpage % groupcount === 0) {
            this.setState({
                startpage: currentpage - groupcount + 1
            })
        }
        if (totalpage - currentpage < 2) {
            this.setState({
                startpage: totalpage - groupcount
            })
        }
        this.setState({
            currentpage
        })
        setTimeout(() => {
            paging({
                currentpage: this.state.currentpage,
                pagecount: this.state.pagecount
            })
        }, 0)

    }
    //页面向前
    goPrev() {
        let {
            currentpage,
        } = this.state;
        if (--currentpage === 0) {
            return
        }
        this.go(currentpage)
    }
    //页面向后
    goNext() {
        let {
            currentpage,
        } = this.state;
        const {
            totalpage
        } = this.props.total;
        if (++currentpage > totalpage) {
            return
        }
        this.go(currentpage)
    }
    render() {
        const page = this.create.bind(this)()
        return (
            <div className="mains">
                <ul className="page">
                    {page}
                </ul>
                {/* <div className="bar">
                    <div>每页显示</div>
                    <div className="select">
                        <ul >
                            {
                                [10, 20, 30, 40, 50].map((item, index) => (
                                    <li id="pagecount" onClick={this.choosePageCount.bind(this, item)} key={index}>{item}条/页</li>
                                ))
                            }
                        </ul>
                    </div>

                </div> */}
            </div>
        )
    }
}
