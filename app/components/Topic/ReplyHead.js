import React, {Component} from "react";
import {gestureBack, gestureToComment, gestureToTop} from "../common/gesture";

export default class ReplyHead extends Component {
    render() {
        return (
            <div className={'topic-reply-head'} ref={el => {
                this.props._topicReplyHead(el);
                this._topicReplyHead = el
            }}>
                <span className={'topic-reply-outer'}>{this.props.repliesLen} 回复</span>
            </div>
        )
    }

    componentDidMount() {
        gestureBack(this._topicReplyHead)  //手势向右返回上一页
        gestureToComment(this._topicReplyHead, this.props.getReplyToTopHeight)  //手势向左至评论区
        gestureToTop(this._topicReplyHead)  //双击滚动到顶部
    }
}