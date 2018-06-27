import extend from 'extend'

export default function utils(state = {
    getDuration: (originTime) => {
        const duration = new Date().getTime() - new Date(originTime).getTime();
        if (duration < 0) {
            return '';
        } else if (duration / 1000 < 60) {
            return '刚刚';
        } else if ((duration / 60000) < 60) {
            return parseInt((duration / 60000)) + '分钟前';
        } else if ((duration / 3600000) < 24) {
            return parseInt(duration / 3600000) + '小时前';
        } else if ((duration / 86400000) < 31) {
            return parseInt(duration / 86400000) + '天前';
        } else if ((duration / 2592000000) < 12) {
            return parseInt(duration / 2592000000) + '个月前';
        } else {
            return parseInt(duration / 31536000000) + '年前';
        }
    },
    toTop: () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0
    }
}, action) {
    return state
}