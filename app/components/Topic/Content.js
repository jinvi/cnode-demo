import React,{Component} from "react";

export default class Content extends Component {
    render() {
        return (
            <div className={'topic-content'} ref={this.props._topicContent} onMouseOver={
                (event) => {
                    this.props.checkLink(event)
                }}
                 dangerouslySetInnerHTML={this.props.createMarkup(this.props.data.content)}/>
        )
    }
}