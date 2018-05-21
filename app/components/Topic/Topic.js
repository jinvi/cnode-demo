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

    goBack() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.props.dispatch({
            type: 'LOAD_TOPIC',
            payload: {
                scrollTop: scrollTop.toString()
            }
        })
        this.props.history.goBack()
    }

    render() {
        const data = this.state.topic.data
        console.log(data)

        return this.state.topic.data ?
            (
                <div>
                    <div className={'topic-back clear'}>
                        <span className={'topic-back-btn topic-back-icon-font'}
                              onClick={this.goBack}>&#xe647;</span>
                        <a href={'#'} className={'topic-reply-btn fright'}>回复</a>
                    </div>
                    <div className={'topic-title'}>
                        <h3>{data.title}</h3>
                        <div className={'topic-detail clear'}>
                            {/*<img width={100} height={100} src={data.author.avatar_url}/>*/}
                            <span>{data.author.loginname}</span>
                            <span>{this.props.getDuration(data.create_at)}</span>
                            {/*<span>{data.reply_count}/{data.visit_count}</span>*/}
                            <span>回复：{data.reply_count}</span>
                            <span>阅读：{data.visit_count}</span>
                            <a className={'fright'}>收藏</a>
                        </div>
                    </div>
                    <div className={'topic-content'} dangerouslySetInnerHTML={{__html: data.content}}/>
                </div>
            ) :
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
                url: `/topic/${currentId}?mdrender=true`,
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