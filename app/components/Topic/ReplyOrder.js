import React, {Component} from "react";

export default class ReplyOrder extends Component {
    render() {
        let orderBtnClass = 'topic-reply-order-btn fright';
        this.orderBtnClass = {  //设置激活排序按钮
            early: !this.props.topic.isReverseReplies ? ' active' : '',
            new: this.props.topic.isReverseReplies ? ' active' : '',
        }

        return (
            <div className={'topic-reply-order clear' + this.props.replyOrderClass}
                 ref={this.props._topicReplyOrder}
                 style={{display: !this.props.topic.data.replies.length ? 'none' : ''}}>
                <span className={orderBtnClass + this.orderBtnClass.new} onClick={this.props.setOrderTrue}>最新</span>
                <span className={orderBtnClass + this.orderBtnClass.early} onClick={this.props.setOrderFalse}>最早</span>
                {/*<span className={'topic-reply-order-title fright'}>回复排序：</span>*/}
            </div>
        )
    }
}
