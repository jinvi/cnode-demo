import React, {Component} from "react";
import {fetchJSON} from '../../utils/fetch'
import Loading from '../common/loading'

export default class Main extends Component {
    render(){
        return 1 ?
            (
                <div>
                    123
                </div>
            )
            :
            <Loading/>
    }
}