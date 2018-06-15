import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'

import Nav from '../common/nav'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectActiveClass: '',
            titleActiveClass: '',
            contentActiveClass: '',
            selectValue: '',
            titleValue: '',
            contentValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.reset = this.reset.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({
            selectActiveClass: '',
            titleActiveClass: '',
            contentActiveClass: ''
        })

        const formData = new FormData(document.querySelector('form'))
        const activeClass = ' create-active'
        const tab = formData.get('tab') || this.setState({selectActiveClass: activeClass})
        const title = formData.get('title') || this.setState({titleActiveClass: activeClass})
        const content = formData.get('content') || this.setState({contentActiveClass: activeClass})

        if (!(tab && title && content)) {  //验证不通过时
            return
        }

        const loginData = JSON.parse(localStorage.getItem(this.props.login.localStorageKey))
        const accessToken = loginData.accessToken

        const queryString = require('query-string');
        const queryParams = queryString.stringify({
            accesstoken: accessToken,
            title: title,
            tab: tab,
            content: content
        });

        fetchJSON({
            url: '/topics',
            req: {
                method: 'post',
                body: queryParams,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            success: res => {
                if (res.success) {
                    this.props.dispatch({
                        type: 'SET_TOPICS_LIST',
                        payload: {
                            list: [],
                            page: 0
                        }
                    })
                    this.props.history.push(`/?tab=${tab}`)
                }
            },
            fail: reason => {
                alert('提交失败。')
            }
        })
    }

    handleChange(e, itemName) {
        if (e.target.value) {
            this.setState({
                [itemName + 'ActiveClass']: ''
            })
        }

        this.setState({
            [itemName + 'Value']: e.target.value
        })
    }

    reset() {
        this.setState({
            selectActiveClass: '',
            titleActiveClass: '',
            contentActiveClass: '',
            selectValue: '',
            titleValue: '',
            contentValue: ''
        })
    }

    render() {
        return (
            <div className={'create-container'}>
                <div className={'create'}>
                    <div className={'create-title clear'}>
                        <span className={'fleft'}>发表主题</span>
                        {/*<span className={'create-info fleft'}>（所有项目为必填项）</span>*/}
                        <span className={'create-reset fright'} onClick={this.reset}>重置</span>
                    </div>
                    <form>
                        <div className={'create-subTitle'}>选择发表版块：
                            <span className={'create-warning fright' + this.state.selectActiveClass}>* 请选择发表版块</span>
                        </div>
                        <select className={'create-select'} name={'tab'} onChange={(e) => {
                            this.handleChange(e, 'select')
                        }} value={this.state.selectValue}>
                            <option value={''}>- 版块 -</option>
                            <option value={'ask'}>问答</option>
                            <option value={'share'}>分享</option>
                            <option value={'job'}>招聘</option>
                            <option value={'dev'}>测试</option>
                        </select>
                        <div className={'create-subTitle'}>输入标题：
                            <span className={'create-warning fright' + this.state.titleActiveClass}>* 请输入标题</span>
                        </div>
                        <input className={'create-inputTitle'} type={'text'} name={'title'} onChange={(e) => {
                            this.handleChange(e, 'title')
                        }} value={this.state.titleValue}/>
                        <div className={'create-subTitle'}>输入正文：
                            <span className={'create-warning fright' + this.state.contentActiveClass}>* 请输入正文</span>
                        </div>
                        <textarea className={'create-content'} name={'content'} onChange={(e) => {
                            this.handleChange(e, 'content')
                        }} value={this.state.contentValue}></textarea>
                        <button className={'create-btn'} onClick={this.handleSubmit}>发表</button>
                    </form>
                </div>
                <Nav {...this.props}/>
            </div>
        )
    }
}