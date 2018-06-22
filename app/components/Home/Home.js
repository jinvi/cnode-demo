import React, {Component} from "react"

import Nav from '../common/nav'
import Head from './Head'
import Topics from './Topics'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Head {...this.props}/>
                <Topics {...this.props}/>
                <Nav {...this.props}/>
            </div>
        )
    }
}