import React, {Component} from "react";
import {BrowserRouter, Route, Link, withRouter, Redirect} from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to='/down' onClick={() => {

                }}>down</Link>
                <Route path='/down' render={() => <div>
                    <Link to='/'>up</Link>
                </div>}/>
            </div>
        )
    }
}