import React, {Component} from "react";

export default class Main extends Component {
    setBodyOverflow(value) {
        function setStyle(el, option) { //设置样式
            for (var attr in option) {
                el.style[attr] = option[attr];
            }
        }
        setStyle(document.body, {
            overflow: value
        })
    }

    render() {
        return (
            <div className={'reply-bg'} onClick={() => {
                history.back(-1)
            }}>
                <div className={'reply-box'}>
                    reply
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setBodyOverflow('hidden')
    }

    componentWillUnmount() {
        this.setBodyOverflow('auto')
    }
}