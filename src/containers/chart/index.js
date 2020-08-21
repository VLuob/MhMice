import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import './index.less'

const Chart = ({
    onEvents,
    option,
    style
}) => {
    return (
        option ? <ReactEcharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            onEvents={onEvents}
            style={style}
        /> : <div className="chart_nodata">
                <img src="/img/chart_nodata.svg" alt="" />
                <div>还未有相关统计数据，可稍后查看</div>
            </div>

    )
}
export default Chart