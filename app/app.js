import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import App from './components/home'

import 'normalize.css'
import './style/main.less'

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById("container"))