import extend from 'extend'

export default function topicsList(state = {list: [], page: 0, scrollTop: 0, url: ''}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_TOPICS_LIST':
            state = action.payload
            break
        case 'SET_TOPICS_SCROLL_TOP':
            state.scrollTop = action.payload.scrollTop
            break
    }
    return state
}