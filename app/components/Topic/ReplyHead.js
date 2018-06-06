import React,{Component} from "react";

export default class ReplyHead extends Component {
    render() {
        return (
            <div className={'topic-reply-head'} ref={this.props._topicReplyHead}>
                <span className={'topic-reply-outer'}>{this.props.repliesLen} 回复</span>
            </div>
        )
    }
}