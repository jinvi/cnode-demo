import extend from 'extend'

export default function user(state = {
    scrollTop: {
        value: 0,
        currentType: ''
    }
}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_USER_SCROLL_TOP':
            state.scrollTop = action.payload
            break
    }

    return state
}