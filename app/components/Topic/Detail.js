import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

export default class Detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCollect: this.props.topic.data.is_collect
        }

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
                url: !this.state.isCollect ? '/topic_collect/collect' : '/topic_collect/de_collect',
                req: {
                    method: 'post',
                    body: queryParams,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                success: (res) => {
                    this.setState({
                        isCollect: !this.state.isCollect
                    })

                    this.props.dispatch({
                        type: 'SET_TOPIC_IS_COLLECT',
                        payload: this.state.isCollect
                    })
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
                <h3>{this.props.topic.data.title}</h3>
                <div className={'topic-detail clear'}>
                    <span>回复：
                        {this.props.topic.data.reply_count ?
                            <a className={'active'} onClick={() => {
                                document.documentElement.scrollTop = document.body.scrollTop = this.props.getReplyToTopHeight()
                            }}>{this.props.topic.data.reply_count}</a>
                            :
                            this.props.topic.data.reply_count
                        }
                    </span>
                    <span>阅读：{this.props.topic.data.visit_count}</span>
                    {
                        loginData ?
                            <a className={'active fright'}
                               onClick={this.setCollect}>{this.state.isCollect ? '已收藏' : '收藏'}</a> :
                            null
                    }

                    <span className={'fright'}>{this.props.getDuration(this.props.topic.data.create_at)}</span>
                    <span className={'fright'}>{this.props.topic.data.author.loginname}</span>
                </div>
            </div>
        )
    }
}