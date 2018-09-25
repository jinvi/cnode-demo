import React, {Component} from "react";
import {Link, Route, Redirect} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'

import Loading from '../common/loading'
import Back from '../common/back'
import Reply from '../Reply'
import Detail from './Detail'
import Content from './Content'
import ReplyHead from './ReplyHead'
import ReplyOrder from './ReplyOrder'
import Replies from './Replies'

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
        this.loadData = this.loadData.bind(this)

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

    loadData(id, isLoadReply) {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        const accessToken = loginData ? '?accesstoken=' + loginData.accessToken : ''
        fetchJSON({
            url: `/topic/${id + accessToken}`,
            success: (res) => {
                if (!isLoadReply) {
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
                } else {
                    this.props.dispatch({
                        type: 'SET_TOPIC_INIT',
                        payload: {
                            id: res.data.id,
                            data: res.data,
                            isReverseReplies: this.props.topic.isReverseReplies
                        }
                    })

                    this.setState({
                        replies: this.props.topic.isReverseReplies ?
                            [].concat(this.props.topic.data.replies).reverse()
                            :
                            this.props.topic.data.replies
                    })
                }
            },
            fail: () => {
                this.setState({
                    isLoadFail: true
                })
            }
        })
    }

    render() {
        const loginData = localStorage.getItem(this.props.login.localStorageKey)

        function setRepliesOrder(replies, isReverse) {  //因为触发setState()，不能作为组件方法，只能作为函数
            this.props.dispatch({
                type: 'SET_REPLIES_IS_REVERSE',
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
                    <Route path={'/topic/:id/replies'}
                           render={(props) => <Reply {...props} loadTopic={this.loadData}
                                                     replyCommentData={this.props.topic.replyComment}/>}/>
                    <Back _commonBack={el => this._topicBack = el}>
                        <Link to={loginData ? `${this.props.location.pathname}/replies` : '/login'}
                              className={'topic-reply-btn fright'}
                              onClick={(event) => {
                                  event.stopPropagation()
                              }}>回复</Link>
                    </Back>
                    <Detail {...this.props} _topicTitle={el => this._topicTitle = el}
                            getReplyToTopHeight={this.getReplyToTopHeight}/>
                    <Content _topicContent={el => this._topicContent = el} checkLink={this.checkLink}
                             createMarkup={this.createMarkup} data={this.props.topic.data}
                             getReplyToTopHeight={this.getReplyToTopHeight}/>
                    <ReplyHead _topicReplyHead={el => this._topicReplyHead = el}
                               repliesLen={this.props.topic.data.replies.length}
                               getReplyToTopHeight={this.getReplyToTopHeight}/>
                    <ReplyOrder {...this.props} replyOrderClass={this.state.replyOrderClass}
                                _topicReplyOrder={el => this._topicReplyOrder = el}
                                getReplyToTopHeight={this.getReplyToTopHeight}
                                setOrderTrue={() => {
                                    setRepliesOrder.bind(this)(this.props.topic.data.replies, true)
                                }}
                                setOrderFalse={() => {
                                    setRepliesOrder.bind(this)(this.props.topic.data.replies, false)
                                }}/>
                    <Replies {...this.props} replies={this.state.replies}
                             replyOrderHeight={this.state.replyOrderHeight}
                             checkLink={this.checkLink} createMarkup={this.createMarkup}
                             loadTopic={this.loadData}
                             setOrderTrue={() => {
                                 setRepliesOrder.bind(this)(this.props.topic.data.replies, true)
                             }}
                             setOrderFalse={() => {
                                 setRepliesOrder.bind(this)(this.props.topic.data.replies, false)
                             }}
                             isReverseReplies={this.props.topic.isReverseReplies}/>
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

            this.loadData(currentId)
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'SET_TOPIC_SCROLL_TOP',
            payload: {
                scrollTop: document.documentElement.scrollTop || document.body.scrollTop  //记录历史滚动条高度
            }
        })
        window.removeEventListener('scroll', this.setBeyondReplyClass, false)  //取消scroll事件
    }
}