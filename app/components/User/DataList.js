import React, {Component} from "react";
import {Route, Switch, Redirect, Link, NavLink} from 'react-router-dom';

import Back from '../common/back'

export default class Main extends Component {
    render() {
        let data, menuList;
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
                name: '未读信息'
            },
            {
                name: '已读信息'
            }
        ]

        switch (this.props.match.params.type) {
            case 'topics':
                data = this.props.userData['recent_topics']
                menuList = topicList
                break
            case 'replies':
                data = this.props.userData['recent_replies']
                menuList = topicList
                break
            case 'collect':
                data = this.props.collectData
                menuList = topicList
                break
            case 'messages':
                data = this.props.messageData
                menuList = msgList
                break
        }

        return (
            <div>
                <Back additionalClass={'flex'} path={'/user'} {...this.props}>
                    <ul className={'user-submenu'}>
                        <li>
                            <NavLink to={'/user/topics'} activeClassName={'active'}>主题</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/user/replies'} activeClassName={'active'}>回复</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/user/collect'} activeClassName={'active'}>收藏</NavLink>
                        </li>
                    </ul>
                </Back>
            </div>
        )
    }
}