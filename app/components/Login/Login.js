import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: ''
        }
    }

    render() {
        return (
            <div className={'login-container'}>
                <div className={'login'}>
                    <div className={'login-title'}>用户登录</div>
                    <form>
                        <div>
                            <input className={'login-text' + this.state.isActive} placeholder={'Access Token'}
                                   type={'text'}
                                   onClick={() => {
                                       this.setState({
                                           isActive: ' active'
                                       })
                                   }}
                                   onBlur={() => {
                                       this.setState({
                                           isActive: ''
                                       })
                                   }}/>
                        </div>
                        <button className={'login-btn'}>登录</button>
                    </form>
                    <div className={'login-detail'}>Access Token 在设置页面获取</div>
                </div>
            </div>
        )
    }
}