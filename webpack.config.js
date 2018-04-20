const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')  //清除构建目录

const entryPath = path.resolve('app', 'app.js')
const outputPath = path.resolve('output')

let isCleanOutput, entry;
if (process.argv.indexOf('-p') === -1) {
    /*
    * 开发模式
    * */
    isCleanOutput = false
    entry = [
        // 'whatwg-fetch',  //fetch polyfill
        'webpack-hot-middleware/client?reload=true&noInfo=true',  //设置react热替换
        entryPath
    ]
} else {
    /*
    * 生产模式
    * */
    isCleanOutput = true
    entry = entryPath
}

// 清除构建目录选项
const cleanPluginOption = {
    dry: !isCleanOutput,  //true：不会操作删除任务，可查看将删除的内容
    verbose: isCleanOutput,  //是否打印log
    allowExternal: false,  //删除的输出目录在当前目录外，需设此项
    exclude: []  //排除的文件
}

module.exports = {
    entry: entry,
    output: {
        filename: 'bundle.js',
        path: outputPath,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(outputPath, cleanPluginOption)
    ],
    devServer: {
        contentBase: path.join(__dirname, "output"),
        compress: true,
        port: 8080
    }
}