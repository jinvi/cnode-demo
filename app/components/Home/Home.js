import React, {Component} from "react"
import ReactDOM from "react-dom";
import {Link, NavLink, Route} from 'react-router-dom'
import {fetchJSON} from '../../utils/fetch'

class Head extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: false,
            userName: 'userName'
        }
    }

    render() {
        return (
            <div className={'head'}>
                <div className={'top clear'} onClick={this.props.toTop}>
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
                            <Link className={'top-loginBtn fright'} to={'/login'} onClick={(event) => {
                                event.stopPropagation()
                            }}>登录</Link>
                    }
                </div>
            </div>
        )
    }
}

class Topics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listData: this.props.topicsList.list  //列表数据在store里
        }

        this.page = this.props.topicsList.page  //列表页数

        this.setTopicsScrollTop = this.setTopicsScrollTop.bind(this)
        this.loadNextList = this.loadNextList.bind(this)
        this.refreshList = this.refreshList.bind(this)
    }

    loadList({tabParam, isNewTab}) {
        if (isNewTab) {  //切换标签初始化状态
            this.page = 0
            this.setState({
                listData: []
            })
        }

        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight  //可视区域高度（不包括滚动高度）
        const listItemHeight = 80 + 1  //列表单项高度（单项高度+分隔线高度）
        const excludeListHeight = 52 + 64 + 46  //视图除列表外剩余高度总和（底部导航高度+头部色块高度+主题导航高度）
        const initListNum = Math.ceil((clientHeight - excludeListHeight) / listItemHeight) + 2  //初始加载列表个数（数量足以溢出视区以触发滚动事件）

        const queryString = require('query-string');
        const queryParams = queryString.stringify({
            page: ++this.page,
            tab: tabParam ? tabParam.split('=')[1] : 'all',
            limit: initListNum
        });

        fetchJSON({
            url: `/topics?${queryParams}`,
            success: (res) => {
                this.props.dispatch({
                    type: 'LOAD_TOPICS',
                    payload: {
                        list: isNewTab ? res.data : this.state.listData.concat(res.data),
                        page: this.page
                    }
                })
                this.setState({
                    listData: this.props.topicsList.list
                })
            }
        })
    }

    loadNextList() { //添加滚动加载列表事件
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  //可视区域高度（不包括滚动高度）
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;  //元素总高度（可视高度与滚动高度）

        if (Math.ceil(scrollTop) + Math.ceil(clientHeight) === Math.ceil(scrollHeight) && Math.ceil(scrollTop) !== 0) {  //滚动到底部时
            this.loadList({tabParam: this.props.location.search, isNewTab: false})
        }
    }

    refreshList() {
        return console.log(111)
        this.page = 0
        this.setState({
            listData: []
        })
        this.loadList({tabParam: this.props.location.search, isNewTab: false});
    }

    setTopicsScrollTop() {
        this.props.dispatch({
            type: 'LOAD_TOPICS',
            payload: {
                scrollTop: document.documentElement.scrollTop || document.body.scrollTop
            }
        })
    }

    render() {
        const avatarStyle = {
            width: '50px',
            height: '50px',
            borderRadius: '50%'
        }

        const listIdSet = new Set()

        const activeClass = 'active'
        const setClass = {}
        location.search.split('=')[1] ? setClass[location.search.split('=')[1]] = activeClass : setClass['all'] = activeClass

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

        return (
            <div>
                <ul className={'topics-nav'}>
                    <li><Link className={setClass.all} to={'/'} onClick={this.refreshList}>全部</Link></li>
                    <li><Link className={setClass.good} to={'/?tab=good'} onClick={this.refreshList}>精华</Link></li>
                    <li><Link className={setClass.share} to={'/?tab=share'} onClick={this.refreshList}>分享</Link></li>
                    <li><Link className={setClass.ask} to={'/?tab=ask'} onClick={this.refreshList}>问答</Link></li>
                    <li><Link className={setClass.job} to={'/?tab=job'} onClick={this.refreshList}>招聘</Link></li>
                </ul>
                <ul className={'topic-list'}>
                    {this.state.listData.map((item, index, list) => {
                        if (listIdSet.has(item.id)) return null  //判断是否有重复项
                        listIdSet.add(item.id)

                        const activeClass = this.props.topic.id === item.id ? ' topic-item-active' : ''

                        return (
                            <li key={item.id} onClick={this.setTopicsScrollTop}>
                                <Link className={'topic-item'} to={`/topic/${item.id}`}>
                                    <img className={'topic-item-avatar'} src={item.author.avatar_url}
                                         style={avatarStyle}/>
                                    <div className={'topic-item-content'}>
                                        <h3 className={'topic-item-title' + activeClass}>{item.title}</h3>
                                        <div className={'topic-item-detail'}>
                                    <span className={'topic-item-tab topic-item-top'} style={{
                                        display: item.top ? 'inline' : 'none'
                                    }}><span className={'topic-item-topIcon'}>&#xe63d;</span>置顶</span>
                                            <span className={'topic-item-tab'} style={{
                                                display: item.top ? 'none' : 'inline'
                                            }}>{transTab(item.tab)}</span>
                                            <span>{item.author.loginname}</span>
                                            <span>{this.props.getDuration(item.create_at)}</span>
                                            <span className={'fright'}>{item.reply_count} / {item.visit_count}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                    <li className={'topic-loading'}></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('scroll', this.loadNextList, false)
        document.documentElement.scrollTop = document.body.scrollTop = this.props.topicsList.scrollTop //设置历史滚动条高度

        if (this.props.topicsList.list.length === 0) {
            this.loadList({tabParam: this.props.location.search, isNewTab: false});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.search !== this.props.location.search) {
            this.loadList({tabParam: nextProps.location.search, isNewTab: true});
        }
        return true
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadNextList, false)  //取消事件及其里面的异步任务，否则其它组件触发事件时会导致内存泄漏
    }
}

class Nav extends Component {
    render() {
        return (
            <ul className={'nav'}>
                <li>
                    <NavLink to={'/'} activeClassName={'nav-active'}><span
                        className={'nav-icon-font'}>&#xe644;</span>首页</NavLink>
                </li>
                <li>
                    <NavLink to={'/create'} activeClassName={'nav-active'}><span
                        className={'nav-icon-font'}>&#xe721;</span>新建</NavLink>
                </li>
                <li>
                    <NavLink to={'/user'} activeClassName={'nav-active'}><span
                        className={'nav-icon-font'}>&#xe61f;</span>我的</NavLink>
                </li>
            </ul>
        )
    }
}

export default class Main extends Component {
    render() {
        return (
            <div>
                <Head {...this.props}/>
                <Topics {...this.props}/>
                <Nav/>
            </div>
        )
    }
}