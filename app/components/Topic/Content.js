import React, {Component} from "react";
import {gestureBack, gestureToComment, gestureToTop} from "../common/gesture";

export default class Content extends Component {
    render() {
        return (
            <div className={'topic-content'} ref={el => {
                this.props._topicContent(el);
                this._topicContent = el;
            }} onMouseOver={
                (event) => {
                    this.props.checkLink(event)
                }}
                 dangerouslySetInnerHTML={this.props.createMarkup(this.props.data.content)}/>
        )
    }

    componentDidMount() {
        gestureBack(this._topicContent)  //手势向右返回上一页
        gestureToComment(this._topicContent, this.props.getReplyToTopHeight)  //手势向左至评论区
        gestureToTop(this._topicContent)  //双击滚动到顶部
    }
}