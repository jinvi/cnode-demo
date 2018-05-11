import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {fetchJSON} from '../utils/fetch'

class Head extends Component {
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
            <div className={'head'}>
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

class Topic extends Component {
    render() {
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

        return (
            <ul className={'topic-list'}>
                {this.props.listData.map((item) => (
                    <li key={item.id}>
                        <a className={'topic-item'} href={'#'}>
                            <img className={'topic-item-avatar'} src={item.author.avatar_url} style={avatarStyle}/>
                            <div className={'topic-item-content'}>
                                <h3 className={'topic-item-title'}>{item.title}</h3>
                                <div className={'topic-item-detail'}>
                                    <span className={'topic-item-tab'}>{transTab(item.tab)}</span>
                                    <span>{item.author.loginname}</span>
                                    <span>{ctDuration(item.create_at)}</span>
                                    <span className={'fright'}>{item.reply_count} / {item.visit_count}</span>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
                <li className={'topic-loading'}></li>
            </ul>
        )
    }
}

class LoadTopic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listData: []
        }

        this.page = 0

        this.loadList = () => {
            console.log(2)
            //可视区域高度（不包括滚动高度）
            const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            const listItemHeight = 70 + 1  //列表单项高度（单项高度+分隔线高度）
            const excludeListHeight = 52 + 64 + 46  //视图除列表外剩余高度总和（底部导航高度+头部色块高度+主题导航高度）
            //初始加载列表个数（数量足以溢出视区以触发滚动事件）
            const initListNum = Math.ceil((clientHeight - excludeListHeight) / listItemHeight) + 2

            const queryString = require('query-string');
            const queryParams = queryString.stringify({
                page: ++this.page,
                tab: 'all',
                limit: initListNum
            });

            fetchJSON('https://cnodejs.org/api/v1/topics?' + queryParams, (json) => {
                this.setState({
                    listData: this.state.listData.concat(json.data)
                })
            })
        }
    }

    render() {
        console.log(1)
        return this.state.listData ? <Topic listData={this.state.listData}/> : null
    }

    componentDidMount() {
        //滚动加载事件
        window.onscroll = () => {
            //滚动高度
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //可视区域高度（不包括滚动高度）
            const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //元素总高度（可视高度与滚动高度）
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

            if (scrollTop + clientHeight === scrollHeight) {  //滚动到底部时
                this.loadList.bind(this)()
            }
        }

        this.loadList.bind(this)();
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
                <Head/>
                <LoadTopic search={location.search}/>
                <Nav/>
            </div>
        )
    }
}