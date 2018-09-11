const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
let port = 8080;

if (process.env.NODE_ENV === 'development') {
    /*
    * 开发模式
    * */
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    const WebpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath
    })
    const WebpackHotMiddleware = require("webpack-hot-middleware")(compiler)

    app.use(WebpackDevMiddleware);
    app.use(WebpackHotMiddleware);

    WebpackDevMiddleware.waitUntilValid(() => {
        console.log(`App listening on port ${port}!\n`);
    });
} else {
    /*
    * 产品模式
    * */
    port = 3000
    app.use(express.static(__dirname + '/output'))  //静态资源文件夹
}

// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'app', 'index.html'))
// })

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'development') {
        console.log(`App listening on port ${port}!\n`);
    }
});