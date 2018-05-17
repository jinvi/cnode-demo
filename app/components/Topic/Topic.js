import React, {Component} from "react";
import {Link} from 'react-router-dom';

export default class Main extends Component {
    render() {
        // console.log(this.props.match.params)

        return (
            <div>
                <div className={'topic-back'}>
                    <Link className={'topic-back-btn'} to={'/'}/>
                    <a className={'topic-reply-btn'} onClick={this.props.history.goBack}>回复</a>
                </div>
            </div>
        )
    }
}