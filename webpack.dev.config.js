const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.basic.config')

let devConfig = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        compress: false,
        inline: true,
        lazy: false,
        contentBase: path.join(__dirname, 'build'),
        publicPath: 'http://localhost:3000/',
        disableHostCheck: true, // do not use production
        historyApiFallback: true,
        hot: true,
        port: 3000
    },
    plugins: [
        //必须添加这个东西才能够通过webpack-dev-server启动起来，醉了
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = webpackMerge(baseConfig,devConfig)