import React, {Component} from "react";

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.goBack = this.goBack.bind(this)
    }

    goBack(event) {
        event.stopPropagation()
        history.go(-1)
    }

    toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0
    }

    render() {
        return (
            <div className={'common-back-container'}>
                <div className={'common-back hei clear'} onClick={this.toTop} ref={this.props._commonBack}>
                        <span className={'common-back-btn common-back-icon-font'}
                              onClick={this.goBack}>&#xe647;</span>
                    {this.props.children}
                </div>
                <div className={'hei'}></div>
            </div>
        )
    }
}