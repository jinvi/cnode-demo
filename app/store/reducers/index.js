import {combineReducers} from "redux";

import topicsList from './topicsList'
import topic from './topic'
import login from './login'
import user from './user'
import utils from './utils'

export default combineReducers({
    topicsList,
    topic,
    utils,
    login,
    user
})