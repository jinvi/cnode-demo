const express = require('express');
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const WebpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
})
const WebpackHotMiddleware = require("webpack-hot-middleware")(compiler)
const port = 8080;

app.use(WebpackDevMiddleware);
app.use(WebpackHotMiddleware);

WebpackDevMiddleware.waitUntilValid(() => {
    console.log(`App listening on port ${port}!\n`);
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app', 'index.html'))
})

app.listen(port, () => {
});