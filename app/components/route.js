import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home'
import Topic from './Topic'
import User from './User'
import Login from './Login'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/topic/:id'} component={Topic}/>
                <Route path={'/user'} component={User}/>
                <Route path={'/login'} component={Login}/>
                {/*<Redirect to={'/'}/>*/}
            </Switch>
        )
    }
}