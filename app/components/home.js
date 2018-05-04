import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {fetchJSON} from '../utils/fetch'
import moment from 'moment'

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

        function createTimeDuration(originTime) {
            const re = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\..+$/
            const formatTime = originTime.replace(re,'$1 $2')

            const m1 = moment(formatTime)  //创建的时间
            const m2 = moment()  //实时时间
            const du = moment.duration(m2-m1,'ms')

            return du.locale('zh-cn').humanize()
        }

        return (
            <ul className={'topic-list'}>
                <li>
                    <a className={'topic-item'} href={'#'}>
                        <img className={'topic-item-avatar'} src={this.state.avatar} style={avatarStyle}/>
                        <div className={'topic-item-content'}>
                            <h3 className={'topic-item-title'}>{this.state.title}</h3>
                            <div className={'topic-item-detail'}>
                                <span className={'topic-item-tab'}>{transTab(this.state.tab)}</span>
                                <span>{this.state.loginName}</span>
                                <span>{createTimeDuration(this.state.createTime)}前</span>
                                <span className={'fright'}>{this.state.reply}/{this.state.visit}</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        )
    }

    componentDidMount() {
        fetchJSON('https://cnodejs.org/api/v1/topics?tab=all&limit=4', (json) => {
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