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
                const login = {
                    id: res.id,
                    loginName: res.loginname,
                    accessToken: accessToken,
                    avatar_url: res.avatar_url
                }

                this.props.dispatch({
                    type: 'SET_LOGIN_SUCCESS',
                    payload: true
                })

                localStorage.setItem(this.props.localStorageKey, JSON.stringify(login))
                history.back(-1)
            },
            fail: reson => {
                alert('Access Token不正确。')
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
                        <form>
                            <div>
                                <input className={'login-text' + this.state.isActive} placeholder={'输入Access Token'}
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