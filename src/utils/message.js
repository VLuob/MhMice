import { message } from 'antd';

export default {
    success(info) {
        message.success(info);
    },

    error(info) {
        message.error(info);
    },

    warning(info) {
        message.warning(info);
    }

}