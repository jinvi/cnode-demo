import {combineReducers} from "redux";

function topicsList(state = {list: [], page: 0}, action) {
    switch (action.type) {
        case 'LOAD_TOPICS':
            state.list = action.payload.list
            state.page = action.payload.page
            return state
    }

    return state
}

function scrollTop(state = 0, action) {
    switch (action.type) {
        case 'SET_SCROLL_TOP':
            return action.payload
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
            return parseInt(duration / 3600000) + '小时前';
        } else if ((duration / 86400000) < 31) {
            return parseInt(duration / 86400000) + '天前';
        } else if ((duration / 2592000000) < 12) {
            return parseInt(duration / 2592000000) + '月前';
        } else {
            return parseInt(duration / 31536000000) + '年前';
        }
    }
}, action) {
    return state
}

function topic(state = {id: '', data: null}, action) {
    switch (action.type) {
        case 'LOAD_TOPIC':
            state.id = action.payload.id
            state.data = action.payload.data
            return state
    }

    return state
}

export default combineReducers({
    topicsList,
    scrollTop,
    utils,
    topic
})