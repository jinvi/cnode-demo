import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import Loading from '../common/loading'

import Nav from '../common/nav'

export default class Main extends Component {
    render(){
        return 1 ?
            (
                <div>
                    <div className={'user-head'}>
                        <div className={'user-head-logout clear'}>
                            <span className={'fright'}>退出</span>
                            <span className={'user-head-logout-icon fright'}>&#xe635;</span>
                        </div>
                        <div className={'user-head-username'}>jinvi</div>
                        <div className={'user-head-signInfo'}>注册于 1 年前</div>
                    </div>
                    <div className={'user-avatar'}></div>
                    <ul className={'user-detail'}>
                        <li>
                            <span className={'user-detail-num'}>38</span>
                            <span className={'user-detail-name'}>积分</span>
                        </li>
                        <li>
                            <span className={'user-detail-num'}>38</span>
                            <span className={'user-detail-name'}>积分</span>
                        </li>
                        <li>
                            <span className={'user-detail-num'}>38</span>
                            <span className={'user-detail-name'}>积分</span>
                        </li>
                    </ul>
                    <Nav {...this.props}/>
                </div>
            )
            :
            <Loading/>
    }
}