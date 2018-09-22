import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'
import {gestureBack, gestureCommentOrder} from "../common/gesture";

export default class Replies extends Component {
    constructor(props) {
        super(props)

        this.setUps = this.setUps.bind(this)
    }

    setReplyComment(item) {
        this.props.dispatch({
            type: 'SET_REPLY_COMMENT',
            payload: {
                reply_id: item.id,
                author: item.author.loginname
            }
        })
    }

    setUps(reply_id) {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        if (loginData) {
            fetchJSON({
                url: `/reply/${reply_id}/ups`,
                req: {
                    method: 'post',
                    body: `accesstoken=${loginData.accessToken}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                success: (res) => {
                    const is_uped = res.action === 'up'
                    const isReverse = this.props.topic.isReverseReplies

                    for (let i = 0; i < this.props.replies.length; i++) {
                        if (this.props.replies[i].id === reply_id) {
                            this.props.replies[i].is_uped = is_uped
                            is_uped ? this.props.replies[i].ups.push('tem_token') : this.props.replies[i].ups.pop()

                            this.props.dispatch({
                                type: 'SET_TOPIC_REPLIES',
                                payload: isReverse ? [].concat(this.props.replies).reverse() : this.props.replies
                            })

                            break
                        }
                    }
                }
            })
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const loginData = localStorage.getItem(this.props.login.localStorageKey)
        return (
            <div>
                {
                    this.props.replies ?
                        (
                            <ul className={'topic-reply-list'} ref={el => this._topicReplyList = el}
                                style={{marginTop: this.props.replyOrderHeight}}>
                                {
                                    this.props.replies.map((item, index) => {
                                        let replyNumClass, replyNumContent;
                                        if (item.author.loginname === this.props.topic.data.author.loginname) {
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
                                                <span className={'topic-reply-avatar'}>
                                                    <img src={item.author.avatar_url}/>
                                                </span>
                                                <div className={'topic-reply-box'}>
                                                    <div className={'topic-reply-detail clear'}>
                                                        <a href={`https://cnodejs.org/user/${item.author.loginname}`}
                                                           target={'_blank'}
                                                           className={'topic-reply-username'}>{item.author.loginname}</a>
                                                        <span
                                                            className={'topic-reply-duration'}>{this.props.getDuration(item.create_at)}</span>
                                                        <span className={replyNumClass}>{replyNumContent}</span>
                                                        <span className={'topic-reply-up fright' +
                                                        (
                                                            item.ups.length ?
                                                                (item.is_uped ? ' topic-reply-up-ownActive' : ' topic-reply-up-active') :
                                                                ''
                                                        )}
                                                              onClick={() => {
                                                                  this.setUps(item.id)
                                                              }}>
                                                                <span className={'topic-reply-upIcon'}>&#xe681;</span>
                                                            {item.ups.length}
                                                                </span>
                                                    </div>
                                                    <div className={'topic-reply-content topic-content'}
                                                         onMouseOver={(event) => {
                                                             this.props.checkLink(event, this.props.topic.data.id)
                                                         }}
                                                         dangerouslySetInnerHTML={this.props.createMarkup(item.content)}/>
                                                    <div>
                                                        <Link
                                                            to={loginData ? `${this.props.location.pathname}/replies` : '/login'}
                                                            className={'topic-reply-reply fright'}
                                                            onClick={() => {
                                                                this.setReplyComment(item)
                                                            }}>&#xe7ac;</Link>
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

    componentDidMount() {
        gestureBack(this._topicReplyList)  //手势向右返回上一页

        //手势向左评论切换排序
        gestureCommentOrder(this._topicReplyList, this.props.isReverseReplies, this.props.setOrderTrue, this.props.setOrderFalse)
    }
}
