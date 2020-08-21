import React from 'react'
import { Modal, Radio, Checkbox, Tooltip } from 'antd';
import { DownloadTitle, DBasicfield, DMediaLabel, DWemediaLabel, DOtherLabel } from 'base/label'
import { utils, message } from 'utils'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { BorderVerticleOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less'
import moment from 'moment'
import arrayMove from 'array-move';
const CheckboxGroup = Checkbox.Group;
const SortableItem = SortableElement(({ value, onChage, onDelete }) => (
    <div className="sort_label" >
        <DeleteOutlined className="sort_del" onClick={e => onDelete(value)} />
        <BorderVerticleOutlined className="sort_drag" />
        <input value={value.label} onChange={e => onChage(e, value)} className="sort_ipt" />
    </div>
));
const labelist = sessionStorage.getItem('sellist')
const getlist = JSON.parse(labelist)
console.log(getlist)
const SortableList = SortableContainer(({ items, onChage, onDelete }) => {
    return (
        <ul className="sort_ul">
            {
                items.map((item, index) => (
                    <SortableItem
                        key={index}
                        index={index}
                        value={item}
                        onChage={onChage}
                        onDelete={onDelete}
                    />
                ))
            }
        </ul >
    );
});

export default class DownloadModal extends React.Component {
    state = {
        visible: false,//model默认
        sel: 0,//tab默认
        basicAll: false,//基础字段全选默认
        mediaAll: false,//媒体全选默认
        mediaWAll: false,//自媒体全选默认
        otherAll: false,//其它字段全选默认
        email: true,//邮箱提醒
        rember: false,//记住选择的字段
        selectList: getlist.data,//自选分类
        value: 0,//单选默认(报告内容)
        taskname: "",//任务名称
        emailval: "",//邮箱
        namelabel: "",//打包字段的名称
    };
    componentDidMount() {
        const l = [...DBasicfield, ...DMediaLabel, ...DWemediaLabel, ...DOtherLabel]
        this.zd()
        var arrs1 = ["aac", "aab", "cfg", 'longen', 'tugenhua', 'single'];
        var arrs2 = ["aac", "mnc", "nba", "cba", "anta", 'tugenhua', 'single'];

    }
    /*   getArrsSameAndDiffElem(arrs1, arrs2) {
          var hash = {},
              sameElemArrs = [],
              diffElemArrs = [];
          if (arrs1.length > 0) {
              for (var i = 0, ilen = arrs1.length; i < ilen; i += 1) {
                  hash[arrs1[i]] = 1;
              }
          }
          if (arrs2.length > 0) {
              for (var j = 0, jlen = arrs2.length; j < jlen; j += 1) {
                  if (hash[arrs2[j]]) {
                      // 说明有相同的元素，把相同的元素存入sameElemArrs数组里面去
                      sameElemArrs.push(arrs2[j]);
                      this.setState({
                          l:sameElemArrs
                      })
                  } else {
                      // 说明是不同的元素，把不同的元素存入diffElemArrs数组里面去
                      diffElemArrs.push(arrs2[j]);
                  }
              }
          }
          return {
              sameElemArrs: sameElemArrs,
              diffElemArrs: diffElemArrs
          }
      } */

    zd() {
        const l = [...DBasicfield, ...DMediaLabel, ...DWemediaLabel, ...DOtherLabel]
        getlist.data.forEach((item, index) => {
            if (item.value === l[index].value) {
                l[index].checked = true
                this.setState({
                    l
                })
                console.log(l[index], '111111111111', item)
            }
        })
    }
    /* 排序返回新的数组 */
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ selectList }) => ({
            selectList: arrayMove(selectList, oldIndex, newIndex),
        }));
    };
    /* 删除自选字段内的项 */
    delLabel = value => {
        value.checked = false
        this.setState({
            selectList: this.state.selectList.filter(item => item != value),
        })
    }
    /* 选择单项字段 */
    BasicCheck = (item, index) => {
        const { selectList } = this.state
        const selIndexOf = selectList.indexOf(item)
        if (!item.checked) {
            item.checked = true
            selectList.push(item)
        } else {
            selectList.splice(selIndexOf, 1)
            item.checked = false
        }
        this.setState({
            selectList,
            basicAll: selectList.length === DBasicfield.length
        })
    };
    /* 基础字段全选 */
    BasicAllCheck = e => {
        const all = []
        if (e.target.checked) {
            DBasicfield.map(item => {
                all.push(item)
                item.checked = true
            })
        } else {
            DBasicfield.map(item => {
                item.checked = false
            })
        }
        this.setState({
            basicAll: e.target.checked,
            selectList: e.target.checked ? this.state.selectList.concat(all) : this.state.selectList.filter(item => item.checked != false),
        })
    }

    /* 媒体字段全选 */
    MediaAllCheck = e => {
        const all = []
        if (e.target.checked) {
            DMediaLabel.map(item => {
                all.push(item)
                item.checked = true
            })
        } else {
            DMediaLabel.map(item => {
                item.checked = false
            })
        }
        this.setState({
            mediaAll: e.target.checked,
            selectList: e.target.checked ? this.state.selectList.concat(all) : this.state.selectList.filter(item => item.checked != false),
        })
    }

    /* 自媒体字段全选 */
    MediaWAllCheck = e => {
        const all = []
        if (e.target.checked) {
            DWemediaLabel.map(item => {
                all.push(item)
                item.checked = true
            })
        } else {
            DWemediaLabel.map(item => {
                item.checked = false
            })
        }
        this.setState({
            mediaWAll: e.target.checked,
            selectList: e.target.checked ? this.state.selectList.concat(all) : this.state.selectList.filter(item => item.checked != false),
        })
    }

    /* 其它字段全选 */
    otherALLCheck = e => {
        const all = []
        if (e.target.checked) {
            DOtherLabel.map(item => {
                all.push(item)
                item.checked = true
            })
        } else {
            DOtherLabel.map(item => {
                item.checked = false
            })
        }
        this.setState({
            otherAll: e.target.checked,
            selectList: e.target.checked ? this.state.selectList.concat(all) : this.state.selectList.filter(item => item.checked != false),
        })
    }
    /* 打开下载框 设置任务名称 */
    showModal = () => {
        this.setState({
            visible: true,
            taskname: "下载明细数据_" + moment().format('YYYYMMDD') + "_" + this.props.title
        });
    };

    /* 关闭model */
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    /* 报告内容选择 */
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    /* 标签选择 */
    activesel(i) {
        this.setState({
            sel: i
        })
    }

    /* 返回数据 */
    gData() {
        const {
            selectList,
            emailval,
            email,
            taskname,
            rember,
            namelabel
        } = this.state
        const {
            getData
        } = this.props
        getData({
            selectList,
            taskname,
            rember,
            emailval,
            namelabel
        })
        this.setState({
            visible: false,
        })
    }

    /* 下载验证判断 提交 */
    downloadChange = e => {
        const { value, email, emailval, selectList, taskname } = this.state
        const { selLength, allLength } = this.props
        const emialBl = utils.isEmail(emailval)

        if (taskname !== '') {
            if (selectList.length > 0) {
                if (value === 0) {
                    if (allLength <= 0) {
                        message.error('所筛选条件内没有相关数据可供下载,请重新筛选')
                    } else {
                        email && !emialBl ? message.error('邮箱格式出错误') : this.gData()
                    }
                } else {
                    if (selLength <= 0) {
                        message.error('未发现需要下载的数据')
                    } else if (selLength > 200000) {
                        message.error('下载数据不能超过20万条')

                    } else {
                        email && !emialBl ? message.error('邮箱格式出错误') : this.gData()
                    }
                }
            } else {
                message.error('未勾选需要下载的字段,请先勾选！')
            }
        } else {
            message.error('标题不能为空')
        }

    }

    /* 修改自选字段内的内容 */
    changeLabel = (e, value) => {
        const { selectList } = this.state
        for (var i in selectList) {
            if (selectList[i].value === value.value) {
                selectList[i].label = e.target.value
            }
        }
        this.setState({
            selectList
        })
    }

    /* 任务名称 邮箱输入 修改 */
    namechange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    savelabel = e => {
        const { savelabel } = this.props
        const { namelabel, selectList } = this.state
        if (selectList.length > 0) {
            if (namelabel !== "") {
                savelabel && savelabel({
                    namelabel,
                    selectList
                })
            } else {
                message.error("给起个名字")
            }
        } else {
            message.error("请先选择分类")
        }

    }
    render() {
        const {
            sel,
            basicAll,
            mediaAll,
            mediaWAll,
            otherAll,
            taskname,
            email,
            emailval,
            rember,
            selectList,
        } = this.state
        const { selLength, allLength } = this.props
        return (
            <>
                <div className="down_icon" onClick={this.showModal}>
                    <Tooltip title="下载Excel数据">
                        <img src="/img/DownloadIcon.svg" alt="" />
                    </Tooltip>
                </div>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={745}
                    centered
                    footer
                >
                    <div className="down_model">
                        <div className="down_head">下载数据</div>
                        <main className="down_body">
                            <div className="down_task">
                                <div className="task_name" style={{ lineHeight: "30px" }}><span>*</span>任务名称</div>
                                <input type="text"
                                    value={taskname}
                                    className="task_ipt"
                                    name="taskname"
                                    onChange={this.namechange.bind(this)} />
                            </div>
                            <div className="down_task">
                                <div className="task_name" style={{ lineHeight: "22px" }}><span>*</span>报告内容</div>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio value={0}>全部分类新闻{`(${allLength})`}</Radio>
                                    <Radio value={1}>自定义勾选新闻{`(${selLength})`}</Radio>
                                </Radio.Group>
                            </div>
                            <div className="down_task">
                                <div className="task_name" style={{ lineHeight: "35px" }}><span>*</span>打包字段</div>
                                <div className="down_tab">
                                    <div className="tab_head">
                                        {
                                            DownloadTitle.map((item, index) => (
                                                <div key={index}
                                                    className={sel === index ? 'active_head' : ''}
                                                    onClick={this.activesel.bind(this, index)}
                                                >{item.name}</div>
                                            ))
                                        }
                                        <div className="tab_numtip">{`(${selectList && selectList.length})`}</div>
                                    </div>
                                    {
                                        sel === 0 &&
                                        <div className="tab_body">
                                            <Checkbox
                                                className="checkbox ant-checkbox-wrapper"
                                                onChange={this.BasicAllCheck}
                                                checked={basicAll}
                                            >
                                                全选
                                         </Checkbox>
                                            {
                                                DBasicfield.map((item, index) => (
                                                    <Checkbox
                                                        key={index}
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        onClick={this.BasicCheck.bind(this, item, index)}
                                                    >
                                                        {item.label}
                                                    </Checkbox>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        sel === 1 &&
                                        <div className="tab_body">
                                            <Checkbox
                                                className="checkbox ant-checkbox-wrapper"
                                                onChange={this.MediaAllCheck}
                                                checked={mediaAll}
                                            >
                                                全选
                                     </Checkbox>
                                            {
                                                DMediaLabel.map((item, index) => (
                                                    <Checkbox
                                                        key={index}
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        onClick={this.BasicCheck.bind(this, item, index)}
                                                    >
                                                        {item.label}
                                                    </Checkbox>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        sel === 2 &&
                                        <div className="tab_body">
                                            <Checkbox
                                                className="checkbox ant-checkbox-wrapper"
                                                onChange={this.MediaWAllCheck}
                                                checked={mediaWAll}
                                            >
                                                全选
                                 </Checkbox>
                                            {
                                                DWemediaLabel.map((item, index) => (
                                                    <Checkbox
                                                        key={index}
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        onClick={this.BasicCheck.bind(this, item, index)}
                                                    >
                                                        {item.label}
                                                    </Checkbox>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        sel === 3 &&
                                        <div className="tab_body">
                                            <Checkbox
                                                className="checkbox ant-checkbox-wrapper"
                                                onChange={this.otherALLCheck}
                                                checked={otherAll}
                                            >
                                                全选
                                 </Checkbox>
                                            {
                                                DOtherLabel.map((item, index) => (
                                                    <Checkbox
                                                        key={index}
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        onClick={this.BasicCheck.bind(this, item, index)}
                                                    >
                                                        {item.label}
                                                    </Checkbox>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        sel === 4 &&
                                        <div className="tab_body">
                                            <SortableList
                                                items={selectList}
                                                onSortEnd={this.onSortEnd}
                                                axis="xy"
                                                distance={3}
                                                helperClass='sortableHelper'
                                                onChage={this.changeLabel}
                                                onDelete={this.delLabel}
                                            />
                                            <div className="tab_rember">
                                                <Checkbox
                                                    onChange={(e) => {
                                                        this.setState({ rember: e.target.checked })
                                                    }}
                                                    checked={rember}
                                                > 记住我这次选择的打包字段</Checkbox>
                                                {
                                                    rember &&
                                                    <div className="rember_btn">
                                                        <input type="text"
                                                            placeholder="给起个名称"
                                                            name="namelabel"
                                                            onChange={this.namechange.bind(this)}

                                                        />
                                                        <button onClick={this.savelabel}>保存</button>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="down_task">
                                <div className="task_name" style={{ lineHeight: "20px" }}><span>*</span>下载完成</div>
                                <div className="task_email">
                                    <Checkbox
                                        onChange={(e) => { this.setState({ email: e.target.checked }) }}
                                        checked={email}
                                    >邮件提醒</Checkbox>
                                    <input type="text"
                                        className="email_ipt"
                                        value={emailval}
                                        name="emailval"
                                        onBlur={() => { !utils.isEmail(emailval) && message.error('邮箱格式错误') }}
                                        onChange={this.namechange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="down_btn">
                                <button onClick={this.handleCancel} >取消</button>
                                <button onClick={this.downloadChange}>下载数据</button>
                            </div>
                        </main>
                    </div>
                </Modal>
            </>
        );
    }
}