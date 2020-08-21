import React from 'react';
import { Tree, Checkbox } from 'antd';
import './index.less'
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Charts } from 'base/label'
import Dropdown from '../Dropdown';

class SearchTree extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        gData: [],
        dataList: [],
        checked: false
    };


    generateList = data => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key } = node;
            this.state.dataList.push({ key, title: key });
            if (node.children) {
                this.generateList(node.children);
            }
        }
    };

    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };
    componentWillMount() {
        const { data } = this.props.param || []
        const { gData } = this.state || []
        data && data.map((item, index) => {
            const items = { ...item, key: item.categoryName }
            items['title'] = items['categoryName']
            delete items['categoryName']
            gData.push(items)
        })
    }
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onChange = e => {
        const { value } = e.target;
        const expandedKeys = this.state.dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return this.getParentKey(item.key, this.state.gData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    onCheck = checkedKeys => {
        const { checkList } = this.props
        const { checked, gData } = this.state
        checkList({
            list: checked ? [] : checkedKeys
        })
    };
    checkAll = e => {
        this.setState({
            checked: e.target.checked
        })
    }
    render() {
        const { searchValue, expandedKeys, checked } = this.state;
        const { param } = this.props
        const { ...st } = param || []
        const loop = data =>
            data && data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span style={{ color: 'orange' }}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                            <span>{item.title}</span>
                        );
                if (item.children) {
                    return { title, key: item.key, children: loop(item.children) };
                }

                return {
                    title,
                    key: item.key,
                };
            });
        return (
            <div className="search" style={{ boxShadow: st.boxShadow, width: st.width }}>
                <div className="padding">
                    {
                        st.title && <div className="h3">该分类下的新闻分类</div>

                    }
                    {
                        st.input &&
                        <div className="input">
                            <SearchOutlined className="ipticon" />
                            <input style={{ marginBottom: 8 }} placeholder={"请输入分类名称"} onChange={this.onChange} className="ipts" />
                        </div>
                    }
                    {
                        st.all &&
                        < div className="search_category">
                            <Checkbox
                                checked={checked}
                                onChange={this.checkAll}
                            >全部分类</Checkbox>
                            <Dropdown name={"⋮"} data={Charts} width={100} height={90} />
                        </div>
                    }

                </div>

                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    treeData={loop(this.state.gData)}
                    checkable
                    onCheck={this.onCheck}
                    className="tree"
                    switcherIcon={<DownOutlined />}
                />
                {
                    st.button && <div className="btn">
                        <button>取消</button>
                        <button>确认</button>
                    </div>
                }

            </div >
        );
    }
}
export default SearchTree