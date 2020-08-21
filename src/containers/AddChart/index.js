import React from 'react'
import { Modal, Checkbox } from 'antd';
import { ChartTypeLabel, MediaTypeLabel } from 'base/label'
import { QuestionCircleOutlined, SettingFilled } from '@ant-design/icons';
import './index.less'
import { allApi } from 'api'
import { MapChart, LineChart, WordChart, PieChart } from "components/DragLayout/chart";
import Select from 'components/Select';
import Datapicker from 'components/Datapicker';
import Chart from 'containers/chart';

const CheckboxGroup = Checkbox.Group;
const options = MediaTypeLabel;
const defaultCheckedList = [];

export default class AddChart extends React.Component {
    state = {
        visible: false,
        list: defaultCheckedList,
        indeterminate: false,
        checkAll: false,
        selval: 0,
        boxshow: false,
        label: "",
        chart: {},
        settype: null,
        chartname: "",
        treeLabel: ""
    };

    check = list => {
        this.setState({
            list,
            indeterminate: !!list.length && list.length < options.length,
            checkAll: list.length === options.length,
        });
    };

    onCheckAllChange = e => {
        let idList = []
        for (var i in options) {
            idList.push(options[i].value)
        }
        this.setState({
            list: e.target.checked ? idList : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    showModal = () => {
        const chartoption = this.props.data
        console.log(this.props.data)
        chartoption && ChartTypeLabel.map(item => {
            if (item.value == chartoption.i) {
                this.setState({
                    label: item.label,
                    settype: item.value
                })
            }
        })
        this.setState({
            visible: true,
            chart: chartoption.chart,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    selactive = item => {
        this.setState({
            selval: item,
        })
    }
    chartClick = e => {
        console.log(e.data)
    }
    addChart = async () => {
        const value = [
            { chart: LineChart, x: 0, y: 0, w: 0, h: 0, i: 0, type: "line" },
            { chart: MapChart, x: 0, y: 0, w: 0, h: 0, i: 4, type: "map" },
            { chart: WordChart, x: 0, y: 0, w: 0, h: 0, i: 5, type: "word" },
            { chart: PieChart, x: 0, y: 0, w: 0, h: 0, i: 3, type: "pie" },
        ]
        const lit = value.filter(item => item.i == this.props.data.i || this.state.selval)
        lit[0].chart.title.text = this.state.chartname
        console.log(value, this.state.chartname, lit)
        const addItem = {
            settingType: 13,
            value: JSON.stringify(value)
        };
        const arr = [ //5map  //3pie //4tree //0line //2cloud
            addItem
        ]
        try {
            const res = await allApi.addChart(arr,
                {
                    token: "a7b629a4244ea103b4130df4a4f94010",
                    isOverride: true,
                })
            if (res.success) {
                this.setState({
                    visible: false
                })
                console.log(res)
            }
        } catch (err) {

        }
    }
    selClick = e => {
        const info = JSON.parse(sessionStorage.getItem('chart')) || []
        switch (e.value) {
            case 0:
                this.setState({
                    chart: info[0].chart,
                    settype: e.value
                })
                break;
            case 1:
                this.setState({
                    chart: info[0].chart,
                    settype: e.value
                })
                break;
            case 2:
                this.setState({
                    chart: info[0].chart,
                    settype: e.value
                })
                break;
            case 3:
                this.setState({
                    chart: info[0].chart,
                    settype: e.value
                })
                break;
            case 4:
                this.setState({
                    chart: info[1].chart,
                    settype: e.value
                })
                break;
            case 5:
                this.setState({
                    chart: info[2].chart,
                    settype: e.value
                })
        }
        this.setState({
            label: e.label,
        })
    }
    iptChange(e) {
        this.setState({
            chartname: e.target.value,
        })
        this.state.chart.title.text = e.target.value
    }
    checkList = e => {
        const { list } = e
        this.setState({
            treeLabel: list.length > 0 && `已勾选${list[0]}` + `${list.length > 1 ? '等' : ''}` + `${list.length}个分类`
        })
    }
    render() {

        const { selval, label, boxshow, chart, chartname, treeLabel } = this.state
        return (
            <>
                <SettingFilled onClick={this.showModal} ></SettingFilled>
                < div onClick={this.showModal} className="addchart"></div>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={810}
                    centered
                    footer
                >
                    <div className="addchart_body">
                        <header className="addchart_head">
                            <span className="addchart_head_creat">新建图表</span>
                        </header>
                        <main className="addchart_main">
                            <div className="main_left">
                                <div className="left_menu">
                                    <span className="menu_text">图表类型</span>
                                    <Select
                                        list={ChartTypeLabel}
                                        boxshow={boxshow}
                                        selClick={this.selClick}
                                        label={label}
                                    />
                                </div>
                                <div className="left_menu">
                                    <span className="menu_text">新闻分类(数据范围,不选是全部分类)</span>
                                    <Select
                                        boxshow={boxshow}
                                        tree={true}
                                        input={true}
                                        list={ChartTypeLabel}
                                        categoryData={JSON.parse(sessionStorage.getItem("category"))}
                                        selClick={this.selClick}
                                        checkList={this.checkList}
                                        data={{ list: ChartTypeLabel }}
                                        label={treeLabel}
                                    />
                                </div>
                                <div className="left_menu">
                                    <span className="menu_text">图表名称</span>
                                    <input
                                        type="text"
                                        className="menu_ipt"
                                        value={chartname}
                                        onChange={(e) => { this.iptChange(e) }}
                                    />
                                </div>
                                <div className="menu_checkbox">
                                    <Checkbox>只分析敏感数据</Checkbox>
                                </div>
                                <div className="menu_mediatype">
                                    <div className="mediatype_txt">媒体类型</div>
                                    <Checkbox
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >全选</Checkbox>
                                    <CheckboxGroup
                                        options={options}
                                        value={this.state.list}
                                        onChange={this.check}
                                    />
                                </div>
                                <div className="menu_check">
                                    <Checkbox>媒体戏份统计到自媒体号</Checkbox>
                                    <QuestionCircleOutlined />
                                </div>
                            </div>
                            <div className="main_right">
                                <div className="head_right">
                                    <Datapicker />
                                    <div className="right_sel">
                                        {
                                            [0, 1, 2].map((item, index) => (
                                                <div className={selval === index ? 'sel_box sel_active' : 'sel_box'}
                                                    key={index}
                                                    onClick={this.selactive.bind(this, item)}
                                                >
                                                    <img src="/img/TreeViewIcon.svg" alt="" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="right_chartbox">
                                    <Chart
                                        option={chart}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        </main>
                        <div className="addchart_btn">
                            <button onClick={this.handleCancel}>取消</button>
                            <button onClick={this.addChart}>保存</button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}