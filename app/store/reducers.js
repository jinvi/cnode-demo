import {combineReducers} from "redux";
import extend from 'extend'

function topicsList(state = {list: [], page: 0, scrollTop: 0}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_TOPICS_LIST':
            state.list = action.payload.list
            state.page = action.payload.page
            break
        case 'SET_TOPICS_SCROLL_TOP':
            state.scrollTop = action.payload.scrollTop
            break
    }
    return state
}

function topic(state = {
    id: '',
    data: null,
    scrollTop: 0,
    isReverseReplies: false,
    replyOrderClass: '',
    replyOrderHeight: 0
}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_TOPIC_REPLY_ORDER':
            state.replyOrderClass = action.payload.replyOrderClass
            state.replyOrderHeight = action.payload.replyOrderHeight
            break
        case 'SET_REPLIES_IS_Reverse':
            state.isReverseReplies = action.payload.isReverseReplies
            break
        case 'SET_TOPIC_INIT':
            state.isReverseReplies = action.payload.isReverseReplies
            state.id = action.payload.id
            state.data = action.payload.data
            break
        case 'SET_TOPIC_SCROLL_TOP':
            state.scrollTop = action.payload.scrollTop
            break
    }
    return state
}

function login(state = {
    accessToken: '',
    loginName: '',
    avatar_url: '',
    id: ''
}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_USER':
            state.accessToken = action.payload.accessToken
            state.loginName = action.payload.loginName
            state.id = action.payload.id
            state.avatar_url = action.payload.avatar_url
            break
    }
    return state
}

function utils(state = {
    getDuration: (originTime) => {
        const duration = new Date().getTime() - new Date(originTime).getTime();
        if (duration < 0) {
            return '';
        } else if (duration / 1000 < 60) {
            return '刚刚';
        } else if ((duration / 60000) < 60) {
            return parseInt((duration / 60000)) + '分钟前';
        } else if ((duration / 3600000) < 24) {
            return parseInt(duration / 3600000) + '个小时前';
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

export default combineReducers({
    topicsList,
    topic,
    utils,
    login
})