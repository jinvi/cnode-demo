import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'
import Loading from '../common/loading'

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
                    this.props.topic.isReverseReplies === 'true' ?
                        [].concat(this.props.topic.data.replies).reverse()
                        :
                        this.props.topic.data.replies
                ) : []
        }
        this.orderBtnClass = {
            early: '',
            new: ''
        }

        this.goBack = this.goBack.bind(this)
        this.beyondOrderReplyOnScroll = this.beyondOrderReplyOnScroll.bind(this)
    }

    goBack(event) {
        event.stopPropagation()
        this.props.history.goBack()
    }

    checkUserReply(event, topicId) {
        if (event.target.nodeName === 'A' && event.target.innerHTML.charAt(0) === '@') {
            const name = event.target.innerHTML.substr(1)
        }
    }

    beyondOrderReplyOnScroll() {
        const topicTitleHeight = parseInt(getStyle(this._topicTitle, 'height'))
        const topicBackHeight = parseInt(getStyle(this._topicBack, 'height'))
        const topicContentHeight = parseInt(getStyle(this._topicContent, 'height'))
        const topicReplyHeadHeight = parseInt(getStyle(this._topicReplyHead, 'height'))
        const topicReplyOrderHeight = parseInt(getStyle(this._topicReplyOrder, 'height'))
        this.replyOrderToTopHeight = topicTitleHeight + topicBackHeight +
            topicContentHeight + topicReplyHeadHeight - topicReplyOrderHeight

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //滚动高度
        if (scrollTop > this.replyOrderToTopHeight) {
            if (this.state.topicReplyOrderHeight !== '0') return  //以值为是否设置为'0'来判断是否需要更新状态，避免重复更新

            this.props.dispatch({
                type: 'LOAD_TOPIC',
                payload: {
                    beyondOrderReplyClass: ' topic-reply-order-beyond',
                    topicReplyOrderHeight: topicReplyOrderHeight + 'px'
                }
            })

            this.setState({
                beyondOrderReplyClass: this.props.topic.beyondOrderReplyClass,
                topicReplyOrderHeight: this.props.topic.topicReplyOrderHeight
            })
        } else {
            if (this.state.topicReplyOrderHeight === '0') return

            this.props.dispatch({
                type: 'LOAD_TOPIC',
                payload: {
                    beyondOrderReplyClass: ' ',
                    topicReplyOrderHeight: '0'
                }
            })

            this.setState({
                beyondOrderReplyClass: this.props.topic.beyondOrderReplyClass,
                topicReplyOrderHeight: this.props.topic.topicReplyOrderHeight
            })
        }

        function getStyle(ele, style) {  //获取元素计算后的样式
            if (ele.currentStyle) {  // 兼容ie方法
                return ele.currentStyle[style];
            } else {  // 兼容火狐、chome
                return getComputedStyle(ele)[style];
            }
        }
    }

    render() {
        const data = this.state.topic.data
        // console.log(data)

        let orderBtnClass = 'topic-reply-order-btn fright';
        this.orderBtnClass = {  //设置激活排序按钮
            early: this.props.topic.isReverseReplies === 'false' ? ' active' : '',
            new: this.props.topic.isReverseReplies === 'true' ? ' active' : '',
        }

        function createMarkup(content) {
            return {__html: content}
        }

        function setRepliesOrder(replies, isReverse) {
            this.props.dispatch({
                type: 'LOAD_TOPIC',
                payload: {
                    isReverseReplies: isReverse  //因reducer判断问题，不能设置为布尔值做判断
                }
            })

            this.setState({
                replies: isReverse === 'true' ? [].concat(replies).reverse() : replies
            })
        }

        return this.state.topic.data ?
            (
                <div>
                    <div className={'topic-back clear'} onClick={this.props.toTop} ref={el => this._topicBack = el}>
                        <span className={'topic-back-btn topic-back-icon-font'}
                              onClick={this.goBack}>&#xe647;</span>
                        <a href={'#'} className={'topic-reply-btn fright'} onClick={(event) => {
                            event.stopPropagation()
                        }}>回复</a>
                    </div>
                    <div className={'topic-title'} ref={el => this._topicTitle = el}>
                        <h3>{data.title}</h3>
                        <div className={'topic-detail clear'}>
                            <span>回复：{data.reply_count}</span>
                            <span>阅读：{data.visit_count}</span>
                            <a className={'topic-collect fright'} href={'#'}>{
                                data.is_collect ? '已收藏' : '未收藏'
                            }</a>
                            <span className={'fright'}>{this.props.getDuration(data.create_at)}</span>
                            <span className={'fright'}>{data.author.loginname}</span>
                        </div>
                    </div>
                    <div className={'topic-content'} ref={el => this._topicContent = el}
                         dangerouslySetInnerHTML={createMarkup(data.content)}/>
                    <div className={'topic-reply-head'} ref={el => this._topicReplyHead = el}>
                        <span className={'topic-reply-outer'}>
                            {this.state.replies.length} 回复
                        </span>
                    </div>
                    <div className={'topic-reply-order clear'}
                         ref={el => this._topicReplyOrder = el}>
                        <span className={orderBtnClass + this.orderBtnClass.new} onClick={() => {
                            setRepliesOrder.bind(this)(data.replies, 'true')
                        }}>最新</span>
                        <span className={orderBtnClass + this.orderBtnClass.early} onClick={() => {
                            setRepliesOrder.bind(this)(data.replies, 'false')
                        }}>最早</span>
                        <span className={'topic-reply-order-title fright'}>排序：</span>
                    </div>
                    {
                        this.state.replies ?
                            (
                                <ul className={'topic-reply-list'}
                                    style={{marginTop: this.state.topicReplyOrderHeight}}>
                                    {
                                        this.state.replies.map((item, index) => {
                                            let replyNumClass, replyNumContent;
                                            if (item.author.loginname === data.author.loginname) {
                                                replyNumContent = '作者'
                                                replyNumClass = 'topic-reply-num-active'
                                            } else {
                                                replyNumContent = this.props.topic.isReverseReplies === 'false' ?
                                                    index + 1 + '楼' :
                                                    this.state.replies.length - index + '楼'
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
                                                            <span className={'topic-reply-up fright'}>
                                                                <span className={'topic-reply-upIcon'}>&#xe681;</span>
                                                                {item.ups.length}
                                                                </span>
                                                        </div>
                                                        <div className={'topic-reply-content topic-content'}
                                                             onMouseOver={(event) => {
                                                                 this.checkUserReply(event, data.id)
                                                             }}
                                                             dangerouslySetInnerHTML={createMarkup(item.content)}/>
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
            :
            <Loading/>
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
                        type: 'LOAD_TOPIC',
                        payload: {
                            id: res.data.id,
                            data: res.data,
                            isReverseReplies: 'false'  //初始化排序
                        }
                    })

                    this.setState({
                        topic: {
                            data: this.props.topic.data,
                            id: this.props.topic.id
                        },
                        replies: this.props.topic.data.replies
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.props.dispatch({
            type: 'LOAD_TOPIC',
            payload: {
                scrollTop: scrollTop.toString(),  //记录历史滚动条高度
            }
        })
    }
}