import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
const Datapicker = ({
    getData,
    style
}) => {
    return (
        <>
            <RangePicker
                ranges={{
                    '今天': [moment(), moment()],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '昨天': [moment().startOf('day').subtract(1, 'days'), moment().endOf('day').subtract(1, 'days')],
                    '最近一周': [moment().startOf('day').subtract(1, 'weeks'), moment()],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={getData}
                bordered={false}
                style={style}
                locale={locale}
                size={"small"}
            />
        </>
    )
}

export default Datapicker