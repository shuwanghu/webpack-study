const {smart} = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');

module.exports = smart(base,{
    mode: 'production',
     // 可以给项目注入变量，变量值名为key，值为value去除“”
    plugins:[ new webpack.DefinePlugin({
        'DEV':JSON.stringify('production')
    })]
});


