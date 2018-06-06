import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import Back from '../common/back'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: ''
        }

        this.sendLoginReq = this.sendLoginReq.bind(this)
    }

    setActiveClass(className) {
        this.setState({
            isActive: className
        })
    }

    sendLoginReq(e) {
        e.preventDefault();
        const formData = new FormData(document.querySelector('form'))
        const accessToken = formData.get('accesstoken')
        fetchJSON({
            url: '/accesstoken',
            req: {
                method: 'post',
                body: 'accesstoken=' + accessToken,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            success: res => {
                const loginData = {
                    accessToken: accessToken,
                    loginName: res.loginname,
                    id: res.id,
                    avatar_url: res.avatar_url
                }

                this.props.dispatch({
                    type: 'SET_LOGIN_SUCCESS',
                    payload: true
                })

                localStorage.setItem(this.props.localStorageKey, JSON.stringify(loginData))
                history.back(-1)
            },
            fail: reason => {
                alert('登录失败，请重新尝试。')
            }
        })
    }

    render() {
        return (
            <div>
                <Back/>
                <div className={'login-container'}>
                    <div className={'login'}>
                        <div className={'login-title'}>用户登录</div>
                        <div className={'login-title-decoration'}></div>
                        <form>
                            <div>
                                <input className={'login-text' + this.state.isActive} placeholder={'Access Token'}
                                       type={'text'}
                                       onFocus={() => {
                                           this.setActiveClass(' active')
                                       }}
                                       onBlur={() => {
                                           this.setActiveClass('')
                                       }} name={'accesstoken'}/>
                            </div>
                            <button className={'login-btn'} onClick={this.sendLoginReq}>登录</button>
                        </form>
                        <div className={'login-detail'}>
                            <span className={'login-detail-icon'}>&#xe8ec;</span>
                            Access Token在<a href={'https://cnodejs.org/setting'} target={'_blank'}>设置</a>页面
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}