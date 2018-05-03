import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import App from './components/route'
import 'es6-promise/auto'  //promise polyfill
import 'whatwg-fetch'  //fetch polyfill

import 'normalize.css'
import './style/main.less'

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById("container"))