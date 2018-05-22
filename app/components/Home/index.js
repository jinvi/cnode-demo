import React, {Component} from "react"
import Loadable from 'react-loadable'
import {connect} from "react-redux"
import Loading from '../common/loading'

const LoadComponent = Loadable({
    loader: () => import('./Home'),
    loading: Loading
})

const mapStateToProps = state => {
    return {
        topicsList: state.topicsList,
        getDuration:state.utils.getDuration,
        toTop:state.utils.toTop
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