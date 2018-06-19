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
                    <div className={'user-head-username'}>{this.props.userData.loginname}</div>
                    <div
                        className={'user-head-signInfo'}>积分：{this.props.userData.score}</div>
                </div>
                <div className={'user-avatar'}>
                    <img src={this.props.userData.avatar_url}></img>
                </div>
                <ul className={'user-detail'}>
                    <li>
                        <div className={'user-detail-num'}>
                            <Link to={'/user/topics'}>
                                {this.props.userData.recent_topics.length}
                            </Link>
                        </div>
                        <div className={'user-detail-name'}>
                            <span>主题</span>
                        </div>
                    </li>
                    <li>
                        <div className={'user-detail-num'}>
                            <Link to={'/user/replies'}>
                                {this.props.userData.recent_replies.length}
                            </Link>
                        </div>
                        <div className={'user-detail-name'}><span>回复</span></div>
                    </li>
                    <li>
                        <div className={'user-detail-num'}>
                            <Link to={'/user/collect'}>
                                {this.props.collectData.length}
                            </Link>
                        </div>
                        <div className={'user-detail-name'}><span>收藏</span></div>
                    </li>
                </ul>
                <ul className={'user-items'}>
                    <li>
                        <Link to={'/user/topics'}>
                            <span className={'user-items-icon'}>&#xe616;</span>
                            <span className={'user-items-name'}>主题</span>
                            <span className={'user-items-arrow fright'}>&#xe636;</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/user/replies'}>
                            <span className={'user-items-icon'}>&#xe7ac;</span>
                            <span className={'user-items-name'}>回复</span>
                            <span className={'user-items-arrow fright'}>&#xe636;</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/user/unreadMsg'}>
                            <span className={'user-items-icon'}>&#xe6f5;</span>
                            <span className={'user-items-name'}>消息</span>
                            {
                                this.props.unReadMsgNum ?
                                    <span className={'user-items-unReadMsgNum'}>{this.props.unReadMsgNum}</span> :
                                    null
                            }
                            <span className={'user-items-arrow fright'}>&#xe636;</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/user/collect'}>
                            <span className={'user-items-icon'}>&#xe620;</span>
                            <span className={'user-items-name'}>收藏</span>
                            <span className={'user-items-arrow fright'}>&#xe636;</span>
                        </Link>
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
            userData: '',
            collectData: '',
            messageData: '',
            unReadMsgNum: 0,
            isLoadFail: false
        }

        this.loadData = this.loadData.bind(this)
    }

    loadData() {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        const loginName = loginData.loginName
        const accessToken = '?accesstoken=' + loginData.accessToken

        fetchJSON({  //用户数据
            url: `/user/${loginName}`,
            success: (res) => {
                this.setState({
                    userData: res.data
                })
            },
            fail: () => {
                this.setState({
                    isLoadFail: true
                })
            }
        })

        fetchJSON({  //收藏数据
            url: `/topic_collect/${loginName}`,
            success: (res) => {
                this.setState({
                    collectData: res.data
                })
            }
        })

        fetchJSON({  //未读消息数
            url: `/message/count${accessToken}`,
            success: (res) => {
                this.setState({
                    unReadMsgNum: res.data
                })
            }
        })

        fetchJSON({  //已读、未读消息
            url: `/messages${accessToken}`,
            success: (res) => {
                this.setState({
                    messageData: res.data
                })
            }
        })
    }

    render() {
        const userData = this.state.userData
        const collectData = this.state.collectData
        const messageData = this.state.messageData

        return userData && collectData ?
            (
                <Switch>
                    <Route path='/user' exact
                           render={() => <User userData={userData} collectData={collectData} topProps={this.props}
                                               unReadMsgNum={this.state.unReadMsgNum}/>}
                    />
                    <Route path={'/user/:type'} render={(props) =>
                        <DataList {...props} userData={userData} collectData={collectData} messageData={messageData}
                                  getDuration={this.props.getDuration}/>
                    }/>
                    <Redirect to={'/'}/>
                </Switch>
            ) :
            <Loading isLoadFail={this.state.isLoadFail}/>
    }

    componentDidMount() {
        this.loadData()
    }
}