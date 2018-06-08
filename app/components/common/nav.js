import React, {Component} from "react";
import {NavLink, Link} from 'react-router-dom'

export default class Nav extends Component {
    render() {
        const login = localStorage.getItem(this.props.login.localStorageKey)
        const activeClass = this.props.location.search ? 'common-nav-active' : ''

        return (
            <ul className={'common-nav'}>
                <li>
                    {this.props.topicsList.url ?
                        <Link to={'/' + this.props.topicsList.url} className={activeClass}>
                            <span className={'common-nav-icon-font'}>&#xe644;</span>首页
                        </Link>
                        :
                        <NavLink to={'/'} exact activeClassName={'common-nav-active'}>
                            <span className={'common-nav-icon-font'}>&#xe644;</span>首页
                        </NavLink>}
                </li>
                <li>
                    <NavLink to={login ? '/create' : '/login'} exact activeClassName={'common-nav-active'}><span
                        className={'common-nav-icon-font'}>&#xe721;</span>新建</NavLink>
                </li>
                <li>
                    <NavLink to={login ? '/user' : '/login'} exact activeClassName={'common-nav-active'}><span
                        className={'common-nav-icon-font'}>&#xe61f;</span>我的</NavLink>
                </li>
            </ul>
        )
    }
}