import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.replyCommentData = this.props.replyCommentData

        this.reply = this.reply.bind(this)
    }

    reply(e) {
        e.preventDefault()
        const formData = new FormData(document.querySelector('form'))
        const content = formData.get('content')
        const url = this.props.location.pathname
        const loginData = JSON.parse(localStorage.getItem(this.props.localStorageKey))
        const accessToken = loginData.accessToken

        const queryString = require('query-string');
        const queryParams = queryString.stringify({
            accesstoken: accessToken,
            content: content,
            reply_id: this.replyCommentData.reply_id || ''
        });

        fetchJSON({
            url: url,
            req: {
                method: 'post',
                body: queryParams,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            success: res => {
                history.back(-1)
                this.props.loadTopic(this.props.match.params.id,true)
            },
            fail: reason => {
                alert('提交失败。')
            }
        })
    }

    render() {
        return (
            <div className={'reply-bg'} onClick={() => {
                history.back(-1)
            }}>
                <div className={'reply-box'} onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div
                        className={'reply-title'}>{this.replyCommentData.author ?
                        `回复 ${this.replyCommentData.author}` :
                        '回复主题'}</div>
                    <form>
                        <textarea className={'reply-content'} type={'text'} name={'content'} defaultValue={
                            this.replyCommentData.author ? `@${this.replyCommentData.author} ` : ''
                        }/>
                        <button className={'reply-btn'} onClick={this.reply}>回复</button>
                    </form>
                    <span className={'reply-close'} onClick={() => {
                        history.back(-1)
                    }}>&#xe635;</span>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style = ''

        this.props.dispatch({
            type: 'SET_REPLY_COMMENT',
            payload: {}  //清空回复数据
        })
    }
}