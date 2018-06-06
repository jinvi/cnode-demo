import React, {Component} from "react";

export default class Detail extends Component {
    render() {
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
                    <a className={'active fright'}>{
                        this.props.data.is_collect ? '已收藏' : '收藏'
                    }</a>
                    <span className={'fright'}>{this.props.getDuration(this.props.data.create_at)}</span>
                    <span className={'fright'}>{this.props.data.author.loginname}</span>
                </div>
            </div>
        )
    }
}