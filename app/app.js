import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import 'core-js/features/object/assign'  //兼容Object.assign
import App from './components/route'
import {Provider} from 'react-redux'
import store from './store/store'
import 'es6-promise/auto'  //promise polyfill
import 'whatwg-fetch'  //fetch polyfill

import 'normalize.css'
import './style/index.less'

render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById("container"))