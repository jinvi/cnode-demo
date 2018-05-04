import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Loadable from 'react-loadable'
// import Home from './home'

const HomeLoader = Loadable({
    loader: () => import('./home'),
    loading: () => (<div>loading</div>)
})

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={HomeLoader}/>
                {/*<Redirect to={'/'}/>*/}
            </Switch>
        )
    }
}