import React from 'react'
import { Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './index.less'

const SortableItem = SortableElement(({ value }) => (
    <div className="card_list"
    //onClick={this.selclick.bind(this, index)}
    >
        <img src="" alt="" className="card_img" />
        <div className="card_content">
            <span>图表分析</span>
            <span>我的今日图表分析</span>
        </div>
        < img src="/img/lookUnsel.svg" alt="" className="unsel" />
    </div>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className="add_card">
            {
                items.map((item, index) => (
                    <SortableItem
                        key={index}
                        index={index}
                        value={item}
                    />
                ))
            }
        </div>
    );
});

export default class AddModal extends React.Component {
    state = {
        visible: false,
        tab: [
            { i: 0, name: "公共看板" },
            { i: 1, name: "个人看板" }
        ],
        sel: [
            { i: 0, name: "公共看板", },
            { i: 1, name: "个人看板", },
            { i: 0, name: "公共看板", },
            { i: 1, name: "个人看板", }
        ],
        idx: 0,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    /* 排序返回新的数组 */
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ sel }) => ({
            selectList: arrayMove(sel, oldIndex, newIndex),
        }));
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    click = (i) => {
        this.setState({
            idx: i
        })

    }
    selclick = (e) => {
        const sel = [...this.state.sel]
        if (sel[e].i === 1) {
            sel[e].i = 0
        } else (
            sel[e].i = 1
        )
        this.setState({
            sel
        })
        console.log(e)
    }
    render() {
        const { idx, tab, sel } = this.state
        return (
            <>
                <PlusCircleOutlined onClick={this.showModal} />
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={700}
                    footer
                    centered
                >
                    <div className="add_model">
                        <div className="add_head">
                            <span>添加模块</span>
                            <div className="add_tab">
                                {
                                    tab.map((item, index) => (
                                        <div
                                            key={index}
                                            className={idx === index ? "add_active" : ""}
                                            onClick={this.click.bind(this, item.i)}
                                        > {item.name}</div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            idx === 0 &&
                            <div className="add_body">
                                <SortableList
                                    items={sel}
                                    onSortEnd={this.onSortEnd}
                                    axis="xy"
                                    distance={3}
                                />
                            </div>
                        }
                        {
                            idx === 1 &&
                            <div className="add_body">
                                <div className="add_card">
                                    {
                                        sel.map((item, index) => (
                                            <div className="card_list"
                                                key={index}
                                                onClick={this.selclick.bind(this, index)}
                                            >
                                                <img src="" alt="" className="card_img" />
                                                <div className="card_content">
                                                    <span>图表分析</span>
                                                    <span>我的今日图表分析</span>
                                                </div>
                                                {
                                                    item.i === 1 ?
                                                        < img src="/img/lookUnsel.svg" alt="" className="unsel" />
                                                        : ""
                                                }
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        }
                        <div className="add_btn">
                            <button onClick={this.handleCancel} >取消</button>
                            <button>保存</button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}