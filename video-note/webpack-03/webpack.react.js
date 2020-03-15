const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const react_path="react";

module.exports={
    mode:'production',
    entry:{
        // test:'./src/test.js',
        react:['react','react-dom'],
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(__dirname,react_path),
        library:'_dll_[name]',
        // libraryTarget:'var',
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,react_path,'manifest.json')
        }),
    ]
}