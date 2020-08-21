import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import './index.less'
const { Option } = Select;
const Selects = observer((props) => {
    const stores = useStores()
    const { homeStore } = stores
    const { data, img } = props.data
    return (
        < div className="selects_component" >
            {
                !img && <img src="/img/news_tab1.svg" alt="" className="component_img" />

            }

            <Select
                defaultValue={data.default}
                bordered={false}
                style={{ color: "#000" }}
                onChange={homeStore.chartChange}
            >
                {
                    data.option.map((item, index) => (
                        <Option value={item.id} key={index} >{item.name}</Option>
                    ))
                }
            </Select>
        </div >
    )
})
export default Selects