import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Loadable from 'react-loadable'  //edge不支持其使用Object.assign方法
// import Home from './home'

const Home = Loadable({
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
                <Route exact path={'/'} component={Home}/>
                {/*<Redirect to={'/'}/>*/}
            </Switch>
        )
    }
}