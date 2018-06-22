import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {fetchJSON} from '../../utils/fetch'

export default class Head extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let loginData;
        if (localStorage.getItem(this.props.login.localStorageKey)) {
            loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        }

        return (
            <div className={'head'}>
                <div className={'top clear'} onClick={this.props.toTop}>
                    <div className={'top-bg'}></div>
                    <h2>
                        <span>CNODE</span>
                        <span className={'top-commentary'}>演示版</span>
                    </h2>
                    {
                        loginData ?
                            <span className={'top-loginState fright clear'}>
                                <img className={'fleft'} src={loginData.avatar_url}/>
                                <Link className={'fleft'} to={'/user'} onClick={e => e.stopPropagation()}>
                                    {loginData.loginName}
                                </Link>
                            </span>
                            :
                            <Link className={'top-loginBtn fright'} to={'/login'} onClick={e => {
                                e.stopPropagation()
                            }}>登录</Link>
                    }
                </div>
            </div>
        )
    }

    componentWillMount() {
        const localStorageKey = this.props.login.localStorageKey
        const accessToken = localStorage.getItem(localStorageKey) && JSON.parse(localStorage.getItem(localStorageKey)).accessToken

        if (!this.props.login.success && accessToken) {  //初始校验token，其他地方不校验
            fetchJSON({
                url: '/accesstoken',
                req: {
                    method: 'post',
                    body: `accesstoken=${accessToken}`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                },
                success: (res) => {
                    this.props.dispatch({
                        type: 'SET_LOGIN_SUCCESS',
                        payload: true
                    })
                },
                fail: () => {
                    localStorage.removeItem(localStorageKey)  //失败则删除localStorage
                }
            })
        }
    }
}