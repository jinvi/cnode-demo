import React, {Component} from "react";
import {Route, Switch, Redirect, Link, NavLink} from 'react-router-dom';
import {gestureBack} from "../common/gesture";

import Back from '../common/back'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            originLength: 0
        }

        this.menuList = []
        this.currentType = ''

        this.setData = this.setData.bind(this)
    }

    setData() {
        let data;

        const topicList = [
            {
                name: '主题',
                path: '/user/topics'
            },
            {
                name: '回复',
                path: '/user/replies'
            },
            {
                name: '收藏',
                path: '/user/collect'
            }
        ]

        const msgList = [
            {
                name: '未读消息',
                path: '/user/unreadMsg'
            },
            {
                name: '已读消息',
                path: '/user/readMsg'
            }
        ]

        switch (/*this.props.match.params.type*/this.props.history.location.pathname.split('/')[2]) {
            case 'topics':
                data = this.props.userData['recent_topics']
                this.menuList = topicList
                this.currentType = '主题'
                break
            case 'replies':
                data = this.props.userData['recent_replies']
                this.menuList = topicList
                this.currentType = '回复'
                break
            case 'collect':
                data = this.props.collectData
                this.menuList = topicList
                this.currentType = '收藏'
                break
            case 'unreadMsg':
                data = this.props.messageData.hasnot_read_messages
                this.menuList = msgList
                this.currentType = '未读消息'
                break
            case 'readMsg':
                data = this.props.messageData.has_read_messages
                this.menuList = msgList
                this.currentType = '已读消息'
                break
        }

        // data = data.concat(data).concat(data).concat(data)

        this.setState({
            data: data,
            originLength: data.length
        })
    }

    render() {
        return (
            <div>
                <Back additionalClass={'flex'} path={'/user'} {...this.props}>
                    <ul className={'user-submenu'}>
                        {
                            this.menuList.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink to={item.path} activeClassName={'active'}
                                                 onClick={(e) => e.stopPropagation()}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Back>
                <div className={'user-subtitle'} ref={el => this._subtitle = el}>
                    共<span className={'active'}>{this.state.originLength}</span>{this.currentType}
                </div>
                <ul className={'user-sublist'} ref={el => this._sublist = el}>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                !(this.currentType.search(/消息/) !== -1) ?
                                    <li key={index} className={'user-sublist-item'}>  {/*主题列表*/}
                                        <Link to={`/topic/${item.id}`} className={'clear'}>
                                            <span className={'user-sublist-avatar fleft'}>
                                                <img src={item.author.avatar_url}/>
                                            </span>
                                            <span
                                                className={'user-sublist-title fleft' + (
                                                    this.props.topicId === item.id ?
                                                        ' active' : ''
                                                )}>{item.title}</span>
                                            <span
                                                className={'user-sublist-date fright'}>{
                                                item.create_at ?
                                                    this.props.getDuration(item.create_at) :
                                                    this.props.getDuration(item.last_reply_at)
                                            }</span>
                                        </Link>
                                    </li> :
                                    <li key={index} className={'user-sublist-msgItem'}>  {/*消息列表*/}
                                        <a href={`https://cnodejs.org/user/${item.author.loginname}`}
                                           target={'_blank'}>{item.author.loginname}</a> 回复了你的
                                        话题 <Link to={`/topic/${item.topic.id}`}>
                                            {item.topic.title}
                                        </Link>
                                    </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    componentWillMount() {
        this.setData()
    }

    componentWillUnmount() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.props.dispatch({
            type: 'SET_USER_SCROLL_TOP',
            payload: {
                value: scrollTop,
                currentType: this.currentType
            }
        })
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (this.props.history.location.pathname !== this.props.match.url) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
            this.setData()
        }
        return true
    }

    componentDidMount() {
        if (this.currentType === this.props.scrollTopData.currentType && this.props.scrollTopData.value) {
            document.documentElement.scrollTop = document.body.scrollTop = this.props.scrollTopData.value  //设置历史滚动条高度
        }

        gestureBack(this._sublist, this.props.history.push, '/user')  //手势向右返回用户首页

        // console.log(getStyle(this._subtitle,'height'))
        function getStyle(ele, style) {  //获取元素计算后的样式
            if (ele.currentStyle) {  // 兼容ie方法
                return ele.currentStyle[style];
            } else {  // 兼容火狐、chome
                return getComputedStyle(ele)[style];
            }
        }
    }
}