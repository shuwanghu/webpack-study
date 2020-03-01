const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    watch: true, //持续打包，文件一发生变化就打包
    watchOptions: { //监控的选项
        poll: 1000, //刷新频率 每？毫秒监听一次
        aggregateTimeout: 1000, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位
        ignored: /node_modules/, //忽略监听某个文件
    },

    // 源码映射 会单独生成一个sourcemap文件 出错了会标识报错的列和行（大 全）
    // devtool:'source-map',//增加映射文件 可以帮助调试源码
    // 源码映射 但是路径文件放在了打包出来js中
    // devtool:"eval-source-map",
    // 不会产生列，但是一个单独的映射文件(  !!! 这一项我没有成功不能直接相信!!!)
    // devtool:"cheap-module-source-map",
    // devtool:"cheap-module-eval-source-map",

    output: {
        // [name]代表文件名
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(), //移除上次打包出来的文件
        new CopyWebpackPlugin([     //将指定文件移入打包文件夹的指定目录
            // './note.md'
            {
                from: './note.md',
                to: './'
            }
        ]),
        new webpack.BannerPlugin('write by hu')
    ],
    module: {
        rules: [{
            test: '/\.js$/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}