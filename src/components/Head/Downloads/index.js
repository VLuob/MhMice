import React from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less'

class Download extends React.Component {
    state = {
        task: [
            { taskId: "20200709002355", status: 0, },
            { taskId: "20200709002351", status: 1, },
            { taskId: "20200709002353", status: 3, }
        ],
        visible: false,
    }

    del = (index) => {
        console.log(index)
        const task = this.state.task
        task.splice(index, 1)
        this.setState({
            task
        })

    }
    hide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    render() {
        return (
            <Popover
                placement="bottomLeft"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                content={
                    <div className="card">
                        <div className="build">共打包了<span className="suc">1</span>个任务&nbsp;&nbsp; <span className="un">3</span>个任务未完成</div>
                        <div className="tasklist">
                            {
                                this.state.task.map((item, index) => (
                                    <li onClick={this.del.bind(this, index)} key={index}>
                                        <div>{item.taskId}</div>
                                        {
                                            item.status === 0 && <span className="text-orange">正在打包</span>
                                        }
                                        {
                                            item.status === 1 && <span className="text-blue">正在下载</span>
                                        }
                                        {
                                            item.status === 3 && <span className="text-blue">重新下载</span>
                                        }
                                        <DeleteOutlined />
                                    </li>
                                ))
                            }

                        </div>
                        <div className="more">
                            <Link to="/about" onClick={this.hide}>更多</Link>
                        </div>
                    </div>
                }
            >
                <main>
                    <DownloadOutlined style={{ fontSize: "20px", color: '#fff' }} />
                </main>
            </Popover>
        )
    }

}
export default Download