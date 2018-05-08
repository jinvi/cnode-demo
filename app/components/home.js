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
        const activeClass = 'active'
        const setClass = {}
        location.search.split('=')[1] ? setClass[location.search.split('=')[1]] = activeClass : setClass['all'] = activeClass

        return (
            <div>
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
                <ul className={'topics-nav'}>
                    <li><Link className={setClass.all} to={'/'}>全部</Link></li>
                    <li><Link className={setClass.good} to={'/?tab=good'}>精华</Link></li>
                    <li><Link className={setClass.share} to={'/?tab=share'}>分享</Link></li>
                    <li><Link className={setClass.ask} to={'/?tab=ask'}>问答</Link></li>
                    <li><Link className={setClass.job} to={'/?tab=job'}>招聘</Link></li>
                </ul>
            </div>
        )
    }
}

class TopicList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            container: null
        }
    }

    render() {
        return (this.state.container)
    }

    componentDidMount() {
        const prStr = new URLSearchParams({
            page: 1,
            tab: 'all',
            limit: 10
        })

        fetchJSON('https://cnodejs.org/api/v1/topics?' + prStr.toString(), (json) => {
            console.log(json)
            const listData = json.data
            const avatarStyle = {
                width: '50px'
                , height: '50px'
                , borderRadius: '50%'
            }

            function transTab(originName) {
                switch (originName) {
                    case 'ask':
                        return '问答'
                    case 'share':
                        return '分享'
                    case 'job':
                        return '招聘'
                    case 'good':
                        return '精华'
                }
            }

            function ctDuration(originTime) {
                const duration = new Date().getTime() - new Date(originTime).getTime();

                if (duration < 0) {
                    return '';
                } else if (duration / 1000 < 60) {
                    return '刚刚';
                } else if ((duration / 60000) < 60) {
                    return parseInt((duration / 60000)) + '分钟前';
                } else if ((duration / 3600000) < 24) {
                    return parseInt(duration / 3600000) + '小时前';
                } else if ((duration / 86400000) < 31) {
                    return parseInt(duration / 86400000) + '天前';
                } else if ((duration / 2592000000) < 12) {
                    return parseInt(duration / 2592000000) + '月前';
                } else {
                    return parseInt(duration / 31536000000) + '年前';
                }
            }

            const el = (
                <ul className={'topic-list'}>
                    {listData.map((item) => (
                        <li key={item.id}>
                            <a className={'topic-item'} href={'#'}>
                                <img className={'topic-item-avatar'} src={item.author.avatar_url} style={avatarStyle}/>
                                <div className={'topic-item-content'}>
                                    <h3 className={'topic-item-title'}>{item.title}</h3>
                                    <div className={'topic-item-detail'}>
                                        <span className={'topic-item-tab'}>{transTab(item.tab)}</span>
                                        <span>{item.author.loginname}</span>
                                        <span>{ctDuration(item.create_at)}</span>
                                        <span className={'fright'}>{item.reply_count}/{item.visit_count}</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )

            this.setState({
                container: el
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
                <TopicList/>
                <Nav/>
            </div>
        )
    }
}