import React, {Component} from "react";
import {Link, Route} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'
import Loading from '../common/loading'
import Back from '../common/back'
import Reply from '../Reply'
import Home from "../Home";

class Detail extends Component {
    render() {
        return (
            <div className={'topic-title'} ref={this.props._topicTitle}>
                <h3>{this.props.data.title}</h3>
                <div className={'topic-detail clear'}>
                    <span>回复：
                        {this.props.data.reply_count ?
                            <a className={'active'} onClick={() => {
                                document.documentElement.scrollTop = document.body.scrollTop = this.props.getReplyToTopHeight()
                            }}>{this.props.data.reply_count}</a>
                            :
                            this.props.data.reply_count
                        }
                    </span>
                    <span>阅读：{this.props.data.visit_count}</span>
                    <a className={'active fright'}>{
                        this.props.data.is_collect ? '已收藏' : '收藏'
                    }</a>
                    <span className={'fright'}>{this.props.getDuration(this.props.data.create_at)}</span>
                    <span className={'fright'}>{this.props.data.author.loginname}</span>
                </div>
            </div>
        )
    }
}

class Content extends Component {
    render() {
        return (
            <div className={'topic-content'} ref={this.props._topicContent} onMouseOver={
                (event) => {
                    this.props.checkLink(event)
                }}
                 dangerouslySetInnerHTML={this.props.createMarkup(this.props.data.content)}/>
        )
    }
}

class ReplyHead extends Component {
    render() {
        return (
            <div className={'topic-reply-head'} ref={this.props._topicReplyHead}>
                <span className={'topic-reply-outer'}>{this.props.repliesLen} 回复</span>
            </div>
        )
    }
}

class ReplyOrder extends Component {
    render() {
        let orderBtnClass = 'topic-reply-order-btn fright';
        this.orderBtnClass = {  //设置激活排序按钮
            early: !this.props.topic.isReverseReplies ? ' active' : '',
            new: this.props.topic.isReverseReplies ? ' active' : '',
        }

        return (
            <div className={'topic-reply-order clear' + this.props.replyOrderClass}
                 ref={this.props._topicReplyOrder}
                 style={{display: !this.props.repliesLen ? 'none' : ''}}>
                <span className={orderBtnClass + this.orderBtnClass.new} onClick={this.props.setOrderTrue}>最新</span>
                <span className={orderBtnClass + this.orderBtnClass.early} onClick={this.props.setOrderFalse}>最早</span>
                <span className={'topic-reply-order-title fright'}>回复排序：</span>
            </div>
        )
    }
}

class Replies extends Component {
    render() {
        return (
            <div>
                {
                    this.props.replies ?
                        (
                            <ul className={'topic-reply-list'}
                                style={{marginTop: this.props.replyOrderHeight}}>
                                {
                                    this.props.replies.map((item, index) => {
                                        let replyNumClass, replyNumContent;
                                        if (item.author.loginname === this.props.data.author.loginname) {
                                            replyNumContent = '作者'
                                            replyNumClass = 'topic-reply-num-active'
                                        } else {
                                            replyNumContent = !this.props.topic.isReverseReplies ?
                                                index + 1 + '楼' :
                                                this.props.replies.length - index + '楼'
                                            replyNumClass = 'topic-reply-num'
                                        }

                                        return (
                                            <li key={item.id}>
                                                <img className={'topic-reply-avatar'} src={item.author.avatar_url}/>
                                                <div className={'topic-reply-box'}>
                                                    <div className={'topic-reply-detail clear'}>
                                                            <span
                                                                className={'topic-reply-username'}>{item.author.loginname}</span>
                                                        <span
                                                            className={'topic-reply-duration'}>{this.props.getDuration(item.create_at)}</span>
                                                        <span className={replyNumClass}>{replyNumContent}</span>
                                                        <span className={'topic-reply-up fright' +
                                                        (item.ups.length ? ' topic-reply-up-active' : '')}>
                                                                <span className={'topic-reply-upIcon'}>&#xe681;</span>
                                                            {item.ups.length}
                                                                </span>
                                                    </div>
                                                    <div className={'topic-reply-content topic-content'}
                                                         onMouseOver={(event) => {
                                                             this.props.checkLink(event, this.props.data.id)
                                                         }}
                                                         dangerouslySetInnerHTML={this.props.createMarkup(item.content)}/>
                                                    <div>
                                                        <span className={'topic-reply-reply fright'}>&#xe7ac;</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        null
                }
            </div>
        )
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topic: {
                data: this.props.topic.data,
                id: this.props.topic.id
            },
            replies: this.props.topic.data ?
                (
                    this.props.topic.isReverseReplies ?
                        [].concat(this.props.topic.data.replies).reverse()
                        :
                        this.props.topic.data.replies
                ) : [],
            replyOrderClass: this.props.topic.replyOrderClass,
            replyOrderHeight: this.props.topic.replyOrderHeight,
            isLoadFail: false
        }
        this.orderBtnClass = {
            early: '',
            new: ''
        }

        this.setBeyondReplyClass = this.setBeyondReplyClass.bind(this)
        this.getReplyToTopHeight = this.getReplyToTopHeight.bind(this)

        window.addEventListener('scroll', this.setBeyondReplyClass, false)
    }

    checkLink(event, topicId) {
        if (event.target.nodeName === 'A') {
            if (event.target.innerHTML.charAt(0) === '@') {
                const name = event.target.innerHTML.substr(1)
                event.target.setAttribute('href', 'https://cnodejs.org/user/' + name)
            }

            event.target.setAttribute('target', '_blank')
        }
    }

    getReplyToTopHeight(getReplyOrderHeight) {
        const topicTitleHeight = parseInt(getStyle(this._topicTitle, 'height'))
        const topicBackHeight = parseInt(getStyle(this._topicBack, 'height'))
        const topicContentHeight = parseInt(getStyle(this._topicContent, 'height'))
        const topicReplyHeadHeight = parseInt(getStyle(this._topicReplyHead, 'height'))
        const topicReplyOrderHeight = parseInt(getStyle(this._topicReplyOrder, 'height'))

        return getReplyOrderHeight ?
            topicReplyOrderHeight
            :
            topicTitleHeight + topicBackHeight +
            topicContentHeight + topicReplyHeadHeight - topicReplyOrderHeight

        function getStyle(ele, style) {  //获取元素计算后的样式
            if (!ele) return
            if (ele.currentStyle) {  // 兼容ie方法
                return ele.currentStyle[style];
            } else {  // 兼容火狐、chome
                return getComputedStyle(ele)[style];
            }
        }
    }

    setBeyondReplyClass() {
        const topicReplyOrderHeight = this.getReplyToTopHeight('getReplyOrderHeight')
        const replyToTopHeight = this.getReplyToTopHeight()

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
        if (scrollTop > replyToTopHeight) {
            if (this.state.replyOrderHeight) return  //避免重复触发更新

            this.props.dispatch({
                type: 'SET_TOPIC_REPLY_ORDER',
                payload: {
                    replyOrderClass: ' topic-reply-order-beyond',
                    replyOrderHeight: topicReplyOrderHeight + 'px'
                }
            })

            this.setState({
                replyOrderClass: this.props.topic.replyOrderClass,
                replyOrderHeight: this.props.topic.replyOrderHeight
            })
        } else {
            if (!this.state.replyOrderHeight) return  //避免重复触发更新

            this.props.dispatch({
                type: 'SET_TOPIC_REPLY_ORDER',
                payload: {
                    replyOrderClass: '',
                    replyOrderHeight: 0
                }
            })

            this.setState({
                replyOrderClass: this.props.topic.replyOrderClass,
                replyOrderHeight: this.props.topic.replyOrderHeight
            })
        }

        function getStyle(ele, style) {  //获取元素计算后的样式
            if (!ele) return
            if (ele.currentStyle) {  // 兼容ie方法
                return ele.currentStyle[style];
            } else {  // 兼容火狐、chome
                return getComputedStyle(ele)[style];
            }
        }
    }

    createMarkup(content) {
        return {__html: content}
    }

    render() {
        const data = this.state.topic.data
        const loginData = localStorage.getItem(this.props.login.localStorageKey)

        function setRepliesOrder(replies, isReverse) {  //不能作为组件方法，只能作为函数
            this.props.dispatch({
                type: 'SET_REPLIES_IS_Reverse',
                payload: {
                    isReverseReplies: isReverse
                }
            })

            this.setState({
                replies: isReverse ? [].concat(replies).reverse() : replies
            })

            if (this.state.replyOrderHeight) {
                document.documentElement.scrollTop = document.body.scrollTop = this.getReplyToTopHeight()
            }
        }

        return this.state.topic.data ?
            (
                <div>
                    <Route path={'/topic/:id/replies'} component={Reply}/>
                    <Back _commonBack={el => this._topicBack = el}>
                        <Link to={loginData ? `${this.props.location.pathname}/replies` : '/login'}
                              className={'topic-reply-btn fright'}
                              onClick={(event) => {
                                  event.stopPropagation()
                              }}>回复</Link>
                    </Back>
                    <Detail {...this.props} _topicTitle={el => this._topicTitle = el} data={data}
                            getReplyToTopHeight={this.getReplyToTopHeight}/>
                    <Content _topicContent={el => this._topicContent = el} checkLink={this.checkLink}
                             createMarkup={this.createMarkup} data={data}/>
                    <ReplyHead _topicReplyHead={el => this._topicReplyHead = el}
                               repliesLen={this.state.replies.length}/>
                    <ReplyOrder {...this.props} replyOrderClass={this.state.replyOrderClass}
                                _topicReplyOrder={el => this._topicReplyOrder = el}
                                repliesLen={this.state.replies.length}
                                setOrderTrue={() => {
                                    setRepliesOrder.bind(this)(data.replies, true)
                                }}
                                setOrderFalse={() => {
                                    setRepliesOrder.bind(this)(data.replies, false)
                                }}/>
                    <Replies {...this.props} replies={this.state.replies} replyOrderHeight={this.state.replyOrderHeight}
                             checkLink={this.checkLink} data={data} createMarkup={this.createMarkup}/>
                </div>
            )
            :
            <Loading isLoadFail={this.state.isLoadFail}/>
    }

    componentDidMount() {
        const lastId = this.state.topic.id
        const currentId = this.props.match.params.id
        document.documentElement.scrollTop = document.body.scrollTop = this.props.topic.scrollTop //设置历史滚动条高度

        if (!this.state.topic.data || lastId !== currentId) {
            this.setState({
                topic: {
                    data: null,
                    id: ''
                }
            })

            fetchJSON({
                url: `/topic/${currentId}`,
                success: (res) => {
                    this.props.dispatch({
                        type: 'SET_TOPIC_INIT',
                        payload: {
                            id: res.data.id,
                            data: res.data,
                            isReverseReplies: false  //初始化排序
                        }
                    })

                    this.setState({
                        topic: {
                            data: this.props.topic.data,
                            id: this.props.topic.id
                        },
                        replies: this.props.topic.data.replies,
                        isLoadFail: false
                    })
                },
                fail: () => {
                    this.setState({
                        isLoadFail: true
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.props.dispatch({
            type: 'SET_TOPIC_SCROLL_TOP',
            payload: {
                scrollTop: scrollTop,  //记录历史滚动条高度
            }
        })
        window.removeEventListener('scroll', this.setBeyondReplyClass, false)  //取消scroll事件
    }
}