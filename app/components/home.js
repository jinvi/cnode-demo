import React, {Component} from "react";
import {Route, Link} from 'react-router-dom';

class HomeTop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: false,
            userName: 'userName'
        }
    }

    render() {
        return (
            <div className={'homeTop'}>
                <h2>
                    <span className={'homeTop-title'}>CNODE</span>
                    <span className={'homeTop-commentary'}>个人演示版</span>
                </h2>
                {
                    this.state.isLogin ?
                        <span className={'homeTop-loginState'}>{this.state.userName}</span> :
                        <Link className={'homeTop-loginBtn'} to={'/login'}>登录</Link>
                }
            </div>
        )
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <HomeTop/>
            </div>
        )
    }
}