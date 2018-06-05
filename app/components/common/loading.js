import React, {Component} from "react";

export default class Main extends Component {
    render() {
        return (
            !this.props.isLoadFail ?
                <div className={'common-loading'}></div>
                :
                <div className={'common-loadFail'}>无法获取数据...</div>
        )
    }
}