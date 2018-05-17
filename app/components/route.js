import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home'
import Topic from './Topic'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/topic/:id'} component={Topic}/>
                {/*<Redirect to={'/'}/>*/}
            </Switch>
        )
    }
}