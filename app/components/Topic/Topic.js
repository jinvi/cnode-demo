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
            }
        }

        this.goBack = this.goBack.bind(this)
    }

    goBack(event) {
        event.stopPropagation()
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.props.dispatch({
            type: 'LOAD_TOPIC',
            payload: {
                scrollTop: scrollTop.toString()
            }
        })
        this.props.history.goBack()
    }

    checkUserReply(event, topicId) {
        if (event.target.nodeName === 'A' && event.target.innerHTML.charAt(0) === '@') {
            const name = event.target.innerHTML.substr(1)
        }
    }

    render() {
        const data = this.state.topic.data

        // console.log(data)

        function createMarkup(content) {
            return {__html: content}
        }

        return this.state.topic.data ?
            (
                <div>
                    <div className={'topic-back clear'} onClick={this.props.toTop}>
                        <span className={'topic-back-btn topic-back-icon-font'}
                              onClick={this.goBack}>&#xe647;</span>
                        <a href={'#'} className={'topic-reply-btn fright'} onClick={(event) => {
                            event.stopPropagation()
                        }}>回复</a>
                    </div>
                    <div className={'topic-title'}>
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
                    <div className={'topic-content'} dangerouslySetInnerHTML={createMarkup(data.content)}/>
                    <div className={'topic-reply-head'}>
                        <span className={'topic-reply-outer'}>
                            {data.reply_count} 回复
                        </span>
                    </div>
                    {
                        data.reply_count ?
                            (
                                <ul className={'topic-reply-list'}>
                                    {
                                        data.replies.map((item, index) => {
                                            let replyNumClass, replyNumContent;
                                            if (item.author.loginname === data.author.loginname) {
                                                replyNumContent = '作者'
                                                replyNumClass = 'topic-reply-num-active'
                                            } else {
                                                replyNumContent = index + 1 + '楼'
                                                replyNumClass = 'topic-reply-num'
                                            }

                                            let replyActiveStyle = {
                                                display:'none'
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
                                                            <span style={replyActiveStyle} className={'topic-reply-reply fright'}>&#xe609;</span>
                                                        </div>
                                                        <div className={'topic-reply-content topic-content'}
                                                             onMouseOver={(event)=>{this.checkUserReply(event,data.id)}}
                                                             dangerouslySetInnerHTML={createMarkup(item.content)}/>
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
                            data: res.data
                        }
                    })

                    this.setState({
                        topic: {
                            data: this.props.topic.data,
                            id: this.props.topic.id
                        }
                    })
                }
            })
        }
    }
}