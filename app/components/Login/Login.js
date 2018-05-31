import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import Loading from '../common/loading'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: ''
        }
    }

    render() {
        const _this = this
        return 1 ?
            (
                <div className={'login-container'}>
                    <div className={'login'}>
                        <div className={'login-title'}>Access Token 登录</div>
                        <form>
                            <div>
                                <input className={'login-text' + _this.state.isActive} placeholder={'Access Token'}
                                       type={'text'}
                                       onClick={() => {
                                           _this.setState({
                                               isActive: ' active'
                                           })
                                       }}
                                       onBlur={() => {
                                           _this.setState({
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
            :
            <Loading/>
    }
}