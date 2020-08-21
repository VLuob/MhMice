import React from 'react'
import { Modal } from 'antd';
import './index.less'
const Confirm = ({
    visible,
    okClick,
    cancelClick,

}) => {
    return (
        <>
            <Modal
                visible={visible}
                onCancel={cancelClick}
                width={400}
                footer
                centered
            >
                <div className="confirm_model">
                    <div className="aconfirm_head">
                        <span>删除确认</span>
                    </div>
                    <div className="confirm_tip">
                        注意：此操作将彻底删除该数据，请确认您是否删除！
                     </div>
                    <div className="confirm_btn">
                        <button onClick={cancelClick}>取消</button>
                        <button onClick={okClick}>删除</button>
                    </div>
                </div>

            </Modal>
        </>
    )
}
export default Confirm