const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        part: './src/part.js'
    },
    output: {
        // [name]代表文件名
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'part.html',
            chunks:['part']
        })
    ],
    module:{
        rules:[]
    }
}