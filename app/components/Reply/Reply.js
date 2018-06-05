import React, {Component} from "react";

export default class Main extends Component {
    render() {
        return (
            <div className={'reply-bg'} onClick={() => {
                history.back(-1)
            }}>
                <div className={'reply-box'} onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className={'reply-title'}>发表评论</div>
                    <form>
                        <textarea className={'reply-content'} type={'text'}/>
                        <button className={'reply-btn'}>发表</button>
                    </form>
                    <span className={'reply-close'}></span>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style = ''
    }
}