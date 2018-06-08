import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

import Nav from '../common/nav'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'create-container'}>
                <div className={'create'}>
                    <div className={'create-title'}>创建主题</div>
                    <form>
                        <div>选择发表版块</div>
                        <select className={'create-select'}>
                            <option value={'ask'}>问答</option>
                            <option value={'share'}>分享</option>
                            <option value={'job'}>招聘</option>
                            <option value={'dev'}>测试</option>
                        </select>
                        <div>输入标题</div>
                        <input type={'text'}/>
                        <textarea></textarea>
                        <button>发表</button>
                    </form>
                </div>
                <Nav {...this.props}/>
            </div>
        )
    }
}