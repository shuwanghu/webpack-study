const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: "production",
    entry: './src/index',
    devServer:{
        port:3000,
        // open:true,
        // contentBase:'./server'
    },
    output: {
        filename: 'index.[hash:8].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        noParse:/jquery/,               //不去解析指定的包，减少打包时长
        rules: [{
            test: /\.js$/,
            include:path.resolve(__dirname,'src'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ]
                }
            }
        }]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}