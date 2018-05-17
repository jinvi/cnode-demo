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

export default combineReducers({
    topicsList,
    scrollTop
})