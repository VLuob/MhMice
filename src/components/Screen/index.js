import React from 'react';
import { Drawer, Checkbox } from 'antd';
import { EmotionLabel, SimilarNewsLabel, CommunicationTypeLabel } from 'base/label'
import './index.less'

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [];
const Screen = ({
    visible,
    list,
    indeterminate,
    checkAll,
    check,
    onCheckAllChange,
    showDrawer,
    onClose,
    typeClick,
    newsval,
    typeval,
    mediaval,
    newsClick,
    mediaClick,
    options
}) => {
    return (
        <>
            <div className="screen_head" onClick={showDrawer}>
                <img src="/img/news_tab1.svg" alt="" className="screen_icon" />
                <span>筛选</span >
            </div>
            <Drawer
                title="筛选"
                placement="right"
                onClose={onClose}
                visible={visible}
                mask={false}
            >
                <div className="screen_media">
                    <div className="media_txt">媒体类型</div>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >全选</Checkbox>
                    <CheckboxGroup
                        options={options}
                        value={list}
                        onChange={check}
                    />
                </div>
                <div className="screen_media">
                    <div className="media_txt">情感属性</div>
                    <div className="screen_radio">
                        {
                            EmotionLabel.map((item, index) => (
                                <div
                                    className={mediaval === index ? 'radio_sel active' : 'radio_sel'}
                                    key={index}
                                    onClick={mediaClick.bind(this, item)}
                                > {item.name} </div>
                            ))
                        }
                    </div>
                </div>
                <div className="screen_media">
                    <div className="media_txt">相似新闻</div>
                    <div className="screen_radio">
                        {
                            SimilarNewsLabel.map((item, index) => (
                                <div
                                    className={newsval === index ? 'radio_sel active' : 'radio_sel'}
                                    key={index}
                                    onClick={newsClick.bind(this, item)}
                                > {item.name} </div>
                            ))
                        }
                    </div>
                </div>
                <div className="screen_media">
                    <div className="media_txt">传播类型</div>
                    <div className="screen_radio">
                        {
                            CommunicationTypeLabel.map((item, index) => (
                                <div
                                    className={typeval === index ? 'radio_sel active' : 'radio_sel'}
                                    key={index}
                                    onClick={typeClick.bind(this, item)}
                                > {item.name} </div>
                            ))
                        }
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default Screen