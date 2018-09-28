import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import {Link} from 'react-router-dom'
import {gestureReload, gestureToNextTag} from "../common/gesture";

export default class Topics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listData: this.props.topicsList.list,  //列表数据在store里
            isLoadFail: false
        }

        this.page = this.props.topicsList.page  //列表页数
        this.isLoadFinish = true

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

        if (!this.isLoadFinish) return  //判断当前是否完成读取数据，防止同时二次读取数据
        this.isLoadFinish = false

        fetchJSON({
            url: `/topics?${queryParams}`,
            success: (res) => {
                this.props.dispatch({
                    type: 'SET_TOPICS_LIST',
                    payload: {
                        list: isNewTab ? res.data : this.state.listData.concat(res.data),
                        page: this.page,
                        url: location.search,
                        scrollTop: document.documentElement.scrollTop || document.body.scrollTop
                    }
                })
                this.setState({
                    listData: this.props.topicsList.list,
                    isLoadFail: false
                })
                this.isLoadFinish = true
            },
            fail: () => {
                this.setState({
                    isLoadFail: true
                })
            }
        })
    }

    loadNextList() { //添加滚动加载列表事件
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  //可视区域高度（不包括滚动高度）
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;  //元素总高度（可视高度与滚动高度）

        const currentHeight = Math.ceil(scrollTop) + Math.ceil(clientHeight)
        const bodyHeight = Math.ceil(scrollHeight)

        if (currentHeight - bodyHeight > -100 && Math.ceil(scrollTop) !== 0) {  //滚动到底部时
            this.loadList({tabParam: this.props.location.search, isNewTab: false})
        }
    }

    refreshList() {
        this.isRefreshList = true
    }

    setTopicsScrollTop() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度

        if (scrollTop != 0) {
            this.props.dispatch({
                type: 'SET_TOPICS_SCROLL_TOP',
                payload: {
                    scrollTop: scrollTop
                }
            })
        }

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
                case 'dev':
                    return '测试'
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
                    <li><Link className={setClass.dev} to={'/?tab=dev'} onClick={this.refreshList}>测试</Link></li>
                </ul>
                <ul className={'topic-list'} ref={el => this._topicList = el}>
                    {this.state.listData.map((item, index, list) => {
                        if (listIdSet.has(item.id)) return null  //判断是否有重复项
                        listIdSet.add(item.id)

                        const activeClass = this.props.topic.id === item.id ? ' topic-item-active' : ''

                        return (
                            <li key={item.id} onClick={this.setTopicsScrollTop}>
                                <Link className={'topic-item'} to={`/topic/${item.id}`}>
                                    <span className={'topic-item-avatar'}>
                                        <img src={item.author.avatar_url}
                                             style={avatarStyle}/>
                                    </span>
                                    <div className={'topic-item-content'}>
                                        <h3 className={'topic-item-title' + activeClass}>{item.title}</h3>
                                        <div className={'topic-item-detail'}>
                                    <span className={'topic-item-tab topic-item-top'} style={{
                                        display: item.top ? 'inline' : 'none'
                                    }}><span className={'topic-item-topIcon'}>&#xe63d;</span>置顶</span>
                                            {item.good && !item.top ?
                                                <span className={'topic-item-tab topic-item-good'}>精华</span> :
                                                <span className={'topic-item-tab'} style={{
                                                    display: item.top ? 'none' : 'inline'
                                                }}>{transTab(item.tab)}</span>}
                                            <span>{item.author.loginname}</span>
                                            <span>{this.props.getDuration(item.create_at)}</span>
                                            <span className={'fright'}>{item.reply_count} / {item.visit_count}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                    {
                        !this.state.isLoadFail ?
                            <li className={'topic-loading'}></li>
                            :
                            <li className={'topic-loadFail'}>无法获取数据...</li>
                    }

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

        gestureToNextTag(this._topicList, this)  //左右手势移动话题列表栏目
        gestureReload(this._topicList, this)  //手势按住话题列表不放重新加载列表，取消字段选择功能，取消右击默认事件
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.search !== this.props.location.search) {
            this.isRefreshList = false
            this.loadList({tabParam: nextProps.location.search, isNewTab: true});
        } else if (this.isRefreshList) {
            this.isRefreshList = false
            this.page = 0
            this.setState({
                listData: []
            })
            this.loadList({tabParam: this.props.location.search, isNewTab: false});
        }
        return true
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadNextList, false)  //取消事件及其里面的异步任务，否则其它组件触发事件时会导致内存泄漏
        this.setTopicsScrollTop()
    }
}