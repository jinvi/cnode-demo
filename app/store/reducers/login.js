import extend from 'extend'

export default function login(state = {
    localStorageKey: 'LOGIN',
    success: false
}, action) {
    state = extend(true, {}, state)
    switch (action.type) {
        case 'SET_LOGIN_SUCCESS':
            state.success = action.payload
            break
    }

    return state
}