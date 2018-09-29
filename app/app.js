import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import 'core-js/features/object/assign'  //兼容Object.assign
import 'es6-promise/auto'  //promise polyfill
import 'whatwg-fetch'  //fetch polyfill
import App from './components/route'
import {Provider} from 'react-redux'
import store from './store/store'

import 'normalize.css'
import './style/index.less'

// import vConsole from 'vconsole'  //移动端控制台，需new创建实例出来，不用时请注释
// new vConsole();

//使用service worker在客户端会把文件都缓存，更新线上文件时必须同时更新客户端缓存文件，
//所以更新线上文件必须触发更新 sw.js 文件以更新缓存文件（注意只更改样式文件并不会触发更新sw.js文件）
require('./service-worker/registration')()  //service worker注册

render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById("container"))