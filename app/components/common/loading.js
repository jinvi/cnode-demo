import React, {Component} from "react";

export default class Main extends Component {
    render() {
        const style = {
            background: `url(${require('../../assets/loading.gif')}) no-repeat`,
            width: '100px',
            height: '20px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            margin: '-10px 0 0 -50px'
        }

        return (
            <div style={style}></div>
        )
    }
}