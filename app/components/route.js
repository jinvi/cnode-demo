import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home'
import Topic from './Topic'
import User from './User'
import Login from './Login'
import Create from './Create'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/topic/:id'} component={Topic}/>
                <Route path={'/user'} component={User}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/create'} component={Create}/>
                <Redirect to={'/'}/>
            </Switch>
        )
    }
}