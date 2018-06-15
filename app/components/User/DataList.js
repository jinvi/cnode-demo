import React, {Component} from "react";
import {Route, Switch, Redirect, Link, NavLink} from 'react-router-dom';

import Back from '../common/back'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            originLength: 0
        }

        this.restList = []
        this.menuList = []
        this.currentType = ''
        this.initListNum = 0

        this.setData = this.setData.bind(this)
        this.addRestList = this.addRestList.bind(this)
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
                name: '未读信息',
                path: '/user/messages'
            },
            {
                name: '已读信息',
                path: '/user/messages/readed'
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
            case 'messages':
                data = this.props.messageData
                this.menuList = msgList
                this.currentType = '未读信息'
                break
        }

        // data = data.concat(data).concat(data)
        const originLength = data.length

        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight  //可视区域高度（不包括滚动高度）
        const listItemHeight = 45 + 1 + 8  //列表单项高度（单项高度+分隔线高度+误差高度）
        const excludeListHeight = 52 + 77 + 4  //视图除列表外剩余高度总和（顶部返回高度+标题高度+列表顶部边框高度）
        this.initListNum = Math.ceil((clientHeight - excludeListHeight) / listItemHeight) + 4  //初始加载列表个数（数量足以溢出视区以触发滚动事件）

        for (let i = 0, len = data.length, delNum = this.initListNum - 1; i < len; i++) {
            if (i > delNum) {
                this.restList.push(data[delNum])
                data.splice(delNum, 1)
            }
        }

        this.setState({
            data: data,
            originLength: originLength
        })
    }

    addRestList() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  //可视区域高度（不包括滚动高度）
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;  //元素总高度（可视高度与滚动高度）

        if (Math.ceil(scrollTop) + Math.ceil(clientHeight) === Math.ceil(scrollHeight) && Math.ceil(scrollTop) !== 0) {  //滚动到底部时
            const data = this.state.data

            for (let i = 0, len = this.restList.length, delNum = this.initListNum - 1; i < len; i++) {
                if (i < delNum) {
                    data.push(this.restList[0])
                    this.restList.splice(0, 1)
                }
            }

            this.setState({
                data: data
            })
        }
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
                                        <NavLink to={item.path} activeClassName={'active'}>
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
                                <li key={index}>
                                    <Link to={`/topic/${item.id}`} className={'clear'}>
                                        <img className={'user-sublist-avatar fleft'} src={item.author.avatar_url}/>
                                        <span className={'user-sublist-title fleft'}>{item.title}</span>
                                        <span
                                            className={'user-sublist-date fright'}>{this.props.getDuration(item.last_reply_at)}</span>
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
        window.addEventListener('scroll', this.addRestList, false)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.addRestList, false)  //取消事件
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (this.props.history.location.pathname !== this.props.match.url) {
            this.setData()
        }
        return true
    }

    componentDidMount() {
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