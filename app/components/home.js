import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {fetchJSON} from '../utils/fetch'

class Top extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: false,
            userName: 'userName'
        }
    }

    render() {
        return (
            <div className={'top clear'}>
                <h2>
                    <span>CNODE</span>
                    <span className={'top-commentary'}>个人演示版</span>
                </h2>
                {
                    this.state.isLogin ?
                        <span className={'top-loginState fright'}>
                            <Link to={'/user'}>
                                {this.state.userName}
                            </Link>
                        </span>
                        :
                        <Link className={'top-loginBtn fright'} to={'/login'}>登录</Link>
                }
            </div>
        )
    }
}

class TopicsNav extends Component {
    render() {
        const activeClass = 'active'
        const setClass = {}
        location.search.split('=')[1] ? setClass[location.search.split('=')[1]] = activeClass : setClass['all'] = activeClass

        return (
            <ul className={'topics-nav'}>
                <li><Link className={setClass.all} to={'/'}>全部</Link></li>
                <li><Link className={setClass.good} to={'/?tab=good'}>精华</Link></li>
                <li><Link className={setClass.share} to={'/?tab=share'}>分享</Link></li>
                <li><Link className={setClass.ask} to={'/?tab=ask'}>问答</Link></li>
                <li><Link className={setClass.job} to={'/?tab=job'}>招聘</Link></li>
            </ul>
        )
    }
}

class TopicList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar: ''
            , title: ''
            , tab: ''
            , loginName: ''
            , createTime: ''
            , reply: ''
            , visit: ''
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
            </div>
        )
    }

    componentDidMount() {
        fetchJSON('https://cnodejs.org/api/v1/topics?tab=all&limit=1', (json) => {
            const data = json.data[0]

            this.setState({
                avatar: data.author.avatar_url
                , title: data.title
                , tab: data.tab
                , loginName: data.author.loginname
                , createTime: data.create_at
                , reply: data.reply_count
                , visit: data.visit_count
            })
        })
    }
}

class Nav extends Component {
    render() {
        return (
            <ul className={'nav'}>
                <li><NavLink to={'/'} activeClassName={'nav-active'}><span
                    className={'icon-font'}>&#xe644;</span>首页</NavLink></li>
                <li><NavLink to={'/create'} activeClassName={'nav-active'}><span className={'icon-font'}>&#xe721;</span>新建</NavLink>
                </li>
                <li><NavLink to={'/user'} activeClassName={'nav-active'}><span className={'icon-font'}>&#xe61f;</span>我的</NavLink>
                </li>
            </ul>
        )
    }
}

export default class Main extends Component {
    render() {
        return (
            <div>
                <Top/>
                <TopicsNav/>
                <TopicList/>
                <Nav/>
            </div>
        )
    }
}