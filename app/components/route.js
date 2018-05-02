import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

import Home from './home'

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