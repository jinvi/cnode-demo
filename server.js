const express = require('express');
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app', 'index.html'))
})

app.use('/', proxy({target: 'https://cnodejs.org/api/v1', changeOrigin: true}));

const port = 8080;
app.listen(port, function () {
    console.log(`App listening on port ${port}!\n`);
});