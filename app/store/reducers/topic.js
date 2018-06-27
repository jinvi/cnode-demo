import extend from 'extend'

export default function topic(state = {
    id: '',
    data: null,
    scrollTop: 0,
    isReverseReplies: false,
    replyOrderClass: '',
    replyOrderHeight: 0,
    replyComment: {
        reply_id: '',
        author: ''
    }
}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_TOPIC_REPLY_ORDER':
            state.replyOrderClass = action.payload.replyOrderClass
            state.replyOrderHeight = action.payload.replyOrderHeight
            break
        case 'SET_REPLIES_IS_REVERSE':
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
        case 'SET_REPLY_COMMENT':
            state.replyComment = action.payload
            break
        case 'SET_TOPIC_IS_COLLECT':
            state.data.is_collect = action.payload
            break
        case 'SET_TOPIC_REPLIES':
            state.data.replies = action.payload
            break
    }
    return state
}