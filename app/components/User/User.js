import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import {Route, Switch, Redirect, Link} from 'react-router-dom';

import Loading from '../common/loading'
import Nav from '../common/nav'
import DataList from './DataList'

class User extends Component {
    render() {
        return (
            <div>
                <div className={'user-head'}>
                    <div className={'user-head-logout clear'}>
                        <span className={'fright'}>退出</span>
                    </div>
                    <div className={'user-head-username'}>{this.props.data.loginname}</div>
                    <div
                        className={'user-head-signInfo'}>积分：{this.props.data.score}</div>
                </div>
                <img src={this.props.data.avatar_url} className={'user-avatar'}></img>
                <ul className={'user-detail'}>
                    <li>
                        <div className={'user-detail-num'}>
                            <Link to={'/user/list'}>{this.props.data.recent_topics.length}</Link>
                        </div>
                        <div className={'user-detail-name'}>
                            <span>主题</span>
                        </div>
                    </li>
                    <li>
                        <div className={'user-detail-num'}>
                            <span>{this.props.data.recent_replies.length}</span>
                        </div>
                        <div className={'user-detail-name'}><span>回复</span></div>
                    </li>
                    <li>
                        <div className={'user-detail-num'}>
                            <span>{this.props.collectData.length}</span>
                        </div>
                        <div className={'user-detail-name'}><span>收藏</span></div>
                    </li>
                </ul>
                <ul className={'user-items'}>
                    <li>
                        <span className={'user-items-icon'}>&#xe616;</span>
                        <span className={'user-items-name'}>主题</span>
                        <span className={'user-items-arrow fright'}>&#xe636;</span>
                    </li>
                    <li>
                        <span className={'user-items-icon'}>&#xe7ac;</span>
                        <span className={'user-items-name'}>回复</span>
                        <span className={'user-items-arrow fright'}>&#xe636;</span>
                    </li>
                    <li>
                        <span className={'user-items-icon'}>&#xe6f5;</span>
                        <span className={'user-items-name'}>消息</span>
                        <span className={'user-items-arrow fright'}>&#xe636;</span>
                    </li>
                    <li>
                        <span className={'user-items-icon'}>&#xe620;</span>
                        <span className={'user-items-name'}>收藏</span>
                        <span className={'user-items-arrow fright'}>&#xe636;</span>
                    </li>
                </ul>
                <Nav {...this.props.topProps}/>
            </div>
        )
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: '',
            collectData: '',
            isLoadFail: false
        }

        this.loadData = this.loadData.bind(this)
    }

    loadData() {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        const loginName = loginData.loginName

        fetchJSON({
            url: `/user/${loginName}`,
            success: (res) => {
                this.setState({
                    data: res.data
                })
            },
            fail: () => {
                this.setState({
                    isLoadFail: true
                })
            }
        })

        fetchJSON({
            url: `/topic_collect/${loginName}`,
            success: (res) => {
                this.setState({
                    collectData: res.data
                })
            }
        })
    }

    render() {
        const data = this.state.data
        const collectData = this.state.collectData

        return data && collectData ?
            (
                <Switch>
                    <Route path='/user' exact
                           render={() => <User data={data} collectData={collectData} topProps={this.props}/>}/>
                    <Route path={'/user/list'} render={(props) => <DataList {...props}/>}/>
                    <Redirect to={'/'}/>
                </Switch>
            ) :
            <Loading isLoadFail={this.state.isLoadFail}/>
    }

    componentDidMount() {
        this.loadData()
    }
}