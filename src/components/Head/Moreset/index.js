import React from 'react'
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'
const Moreset = () => {
    return (
        <Dropdown overlay={
            < Menu >
                < Menu.Item icon={<UserOutlined />}>
                    <Link to='/ant' >添加监测项</Link>
                </Menu.Item>
                < Menu.Item icon={<PlusCircleOutlined />}>
                    <Link to='/ant' >添加新闻标签</Link>
                </Menu.Item>
                < Menu.Item icon={<UserOutlined />}>
                    <Link to='/ant' >添加邮件报告</Link>
                </Menu.Item>
                < Menu.Item icon={<PlusCircleOutlined />}>
                    <Link to='/ant' >添加预警报告</Link>
                </Menu.Item>
                < Menu.Item icon={<UserOutlined />}>
                    <Link to='/ant' >添加平台用户</Link>
                </Menu.Item>
            </Menu >
        }
            className="set"
            placement="bottomRight"
        >
            <main>
                <PlusCircleOutlined className="icon" />
            </main>
        </Dropdown >
    )

}
export default Moreset