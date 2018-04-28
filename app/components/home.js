import React, {Component} from "react";
import {Link} from 'react-router-dom';

class HomeTop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: true,
            userName: 'userName'
        }
    }

    render() {
        return (
            <div className={'homeTop clear'}>
                <h2>
                    <span>CNODE</span>
                    <span className={'homeTop-commentary'}>个人演示版</span>
                </h2>
                {
                    this.state.isLogin ?
                        <span className={'homeTop-loginState fright'}>
                            <Link to={'/user'}>
                                {this.state.userName}
                            </Link>
                        </span>
                        :
                        <Link className={'homeTop-loginBtn fright'} to={'/login'}>登录</Link>
                }
            </div>
        )
    }
}

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

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
                <Nav/>
            </div>
        )
    }
}