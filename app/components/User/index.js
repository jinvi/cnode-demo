import React, {Component} from "react"
import Loadable from 'react-loadable'
import {connect} from "react-redux"
import Loading from '../common/loading'

const LoadComponent = Loadable({
    loader: () => import('./User'),
    loading: Loading
})

const mapStateToProps = state => {
    return {
        login: state.login,
        topicsList: state.topicsList,
        getDuration: state.utils.getDuration,
        topicId: state.topic.id,
        scrollTopData: state.user.scrollTop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadComponent)