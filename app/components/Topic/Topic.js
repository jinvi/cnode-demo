import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {fetchJSON} from '../../utils/fetch'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topic: null
        }
    }

    render() {
        const data = this.state.topic
        console.log(data)

        return this.state.topic ?
            (
                <div>
                    <div className={'topic-back'}>
                        <Link className={'topic-back-btn'} to={'/'}/>
                        <a className={'topic-reply-btn'} onClick={this.props.history.goBack}>回复</a>
                    </div>
                    <div className={'topic-title'}>
                        <h3>{data.title}</h3>
                        <div>
                            <img width={100} height={100} src={data.author.avatar_url}/>
                            <span>{data.author.loginname}</span>
                            <span>{this.props.getDuration(data.create_at)}</span>
                            <span>{data.reply_count} / {data.visit_count}</span>
                            <span>收藏</span>
                        </div>
                    </div>
                </div>
            ) :
            null
    }

    componentDidMount() {
        if (!this.state.topic) {
            fetchJSON({
                url: `/topic/${this.props.match.params.id}`,
                success: (res) => {
                    this.setState({
                        topic: res.data
                    })
                }
            })
        }
    }
}