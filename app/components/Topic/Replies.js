import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'

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
                    this.props.loadTopic(this.props.match.params.id, true)
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
                                                        (item.ups.length ? ' topic-reply-up-active' : '')}
                                                              onClick={() => {
                                                                  this.setUps(item.id)
                                                              }}>
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
}
