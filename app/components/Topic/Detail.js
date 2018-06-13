import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

export default class Detail extends Component {
    constructor(props) {
        super(props)

        this.setCollect = this.setCollect.bind(this)
    }

    setCollect() {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        if (loginData) {
            const accessToken = loginData.accessToken
            const queryString = require('query-string');
            const queryParams = queryString.stringify({
                accesstoken: accessToken,
                topic_id: this.props.match.params.id
            });

            fetchJSON({
                url: !this.props.data.is_collect ? '/topic_collect/collect' : '/topic_collect/de_collect',
                req: {
                    method: 'post',
                    body: queryParams,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                success: (res) => {
                    this.props.loadTopic(this.props.match.params.id)
                }
            })
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))

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
                    {
                        loginData ?
                            <a className={'active fright'}
                               onClick={this.setCollect}>{this.props.data.is_collect ? '已收藏' : '收藏'}</a> :
                            null
                    }

                    <span className={'fright'}>{this.props.getDuration(this.props.data.create_at)}</span>
                    <span className={'fright'}>{this.props.data.author.loginname}</span>
                </div>
            </div>
        )
    }
}