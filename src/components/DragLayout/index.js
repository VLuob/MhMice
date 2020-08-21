import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import { DeleteOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { chartApi } from 'api'
import 'components/DragLayout/index.less'
import 'echarts-wordcloud'
import 'echarts/map/js/china';
import AddChart from 'containers/AddChart'
import Chart from 'containers/chart'
import Confirm from 'containers/Confirm'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default class DragLayout extends PureComponent {
    static defaultProps = {
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 100,
    };
    constructor(props) {
        super(props);
        this.state = {
            layouts: this.getFromLS("layouts") || {},
            visible: false,
            widgets: [],
        }
    }

    getFromLS(key) {
        let ls = {};
        if (global.localStorage) {
            try {
                ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
            } catch (e) {
                /*Ignore*/
            }
        }
        return ls[key];
    }
    saveToLS(key, value) {
        if (global.localStorage) {
            global.localStorage.setItem(
                "rgl-8",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }
    onRemoveItem = i => {
        this.setState({
            i,
            visible: true
        });
    }
    delChartClick = async () => {
        const res = await chartApi.delChart({ token: '640b37dc3efb1fe43c9cd4a232de1415', id: this.state.i })
        this.setState({
            visible: false,
            widgets: this.state.widgets.filter((item, index) => index != this.state.i)
        });
    }
    componentDidMount() {
        this.handleChartList()
    }
    onLayoutChange(layout, layouts) {
        this.saveToLS("layouts", layouts);
        this.setState({ layouts });
    }

    chartClick(e) {
        console.log(e.data)
    }

    handleChartList() {
        const info = JSON.parse(sessionStorage.getItem('chart')) || []
        console.log(info)

        this.setState({
            widgets: info
        })
    }

    render() {
        let onEvents = {
            'click': this.chartClick.bind(this)
        }
        return (
            <>
                <div>
                    <ResponsiveReactGridLayout
                        className="layout"
                        {...this.props}
                        layouts={this.state.layouts}
                        onLayoutChange={(layout, layouts) =>
                            this.onLayoutChange(layout, layouts)
                        }
                    >
                        {

                            this.state.widgets.map((item, index) => (
                                <div key={item.i}>
                                    <div className='remove' >
                                        <Tooltip
                                            placement="top"
                                            title={'图表设置'}>
                                            <AddChart
                                                data={item}
                                                del={this.state.i}
                                            />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'进入详情'}>
                                            <ExpandAltOutlined className="child" />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'移除表格'}>
                                            <DeleteOutlined onClick={this.onRemoveItem.bind(this, index)} />
                                        </Tooltip>
                                    </div>
                                    <Chart
                                        option={item.chart}
                                        style={{ width: '100%', height: '100%' }}
                                        onEvents={onEvents}
                                    />
                                </div>
                            ))
                        }
                    </ResponsiveReactGridLayout>
                </div>
                <Confirm
                    cancelClick={() => { this.setState({ visible: false }) }}
                    visible={this.state.visible}
                    okClick={this.delChartClick}
                />
            </>
        )
    }
}
