const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')  //清除构建目录
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //将样式提取到独立文件

const entryPath = path.resolve('app', 'app.js')
const outputPath = path.resolve('output')
const publicPath = '/'  //线上路径

let isCleanOutput, entry;
if (process.argv.indexOf('-p') === -1) {
    /*
    * 开发模式
    * */
    process.env.NODE_ENV = 'development'
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
const CleanPluginOption = {
    dry: !isCleanOutput,  //true：不会操作删除任务，可查看将删除的内容
    verbose: isCleanOutput,  //是否打印log
    allowExternal: false,  //删除的输出目录在当前目录外，需设此项
    exclude: []  //排除的文件
}

// 提取样式选项
const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"  //开发模式取消提取
});

module.exports = {
    entry: entry,
    output: {
        filename: 'bundle.js',
        path: outputPath,
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,  //单位byte，超过限制使用file-loader代替，选项同时转移，否则输出DataURL图片
                            name: '[name].[ext]',
                            outputPath: '',  //输出目录
                            // publicPath: publicPath,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(outputPath, CleanPluginOption),
        extractLess
    ]
}