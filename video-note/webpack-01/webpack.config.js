const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development', //模式 预设两种 ‘production’ ‘development’
    optimization: { //在production下才会用到这些配置
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    devServer: { //开发服务器的配置
        port: 3000,
        progress: true,
        contentBase: './build',
        // open: true,
    },
    entry: './src/index', // 入口
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build') //路径必须为绝对路径
    },
    plugins: [ //放置所有的webpack插件
        /* new webpack.ProvidePlugin({
            '$':'jquery',     //在每个模块中注入$
        }), */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, //移除标签上的"
                // collapseWhitespace: true //文本压缩成一行
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.[hash:8].css'
        })
    ],
    externals: { //忽略代码中引入的某个模块
        jquery: '$'
    },
    module: {
        rules: [
            //loader的特点，一个loader只干一件事
            // use后面单个loader直接写loader，多个loader用数组，处理顺序为从右向左执行
            // loader 类型：
            //      pre 前置loader；
            //      normal 普通loader；
            //      内联loader；可以在代码中使用 使用方式如下：'expose-loader?$!jquery'
            //      post 后置loader
            /* {
                test:require.resolve('jquery'),
                use:'expose-loader?$'       //将进入的模块挂载在全局变量下面 ？后面跟的就是挂载的
            }, */
            /* {
                test:/\.js$/,
                use:'eslint-loader',    //使用eslint对代码校验
                enforce:'pre',
                include: path.resolve(__dirname, 'src')
            }, */
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader', //会在内部生成新文件放在build目录下，返回结果为新图片地址
                    options: {
                        limit: 1024 * 1,
                        esModule: false,
                        outputPath: 'img/',
                    }
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { //es6->es5
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: 2
                            }]
                            // '@babel/preset-env'
                        ],
                        sourceType: 'unambiguous',
                        plugins: [
                            // 用来支持类属性
                            ["@babel/plugin-proposal-decorators", {
                                "legacy": true
                            }],
                            ['@babel/plugin-proposal-class-properties', {
                                "loose": true
                            }],
                            // "@babel/plugin-transform-runtime",  //无法解析实例上的方法
                        ]
                    }
                }],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(less|css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }
                    /* { //写成对象的样式可以加更多的配置
                        loader: 'style-loader',
                        options: {
                            insert: "title"
                            //使标签插入到index的title中,可以让index的样式优先级高于引入样式
                        }
                    } */
                    , 'css-loader' //css-loader 解析 @import这种语法
                    , 'postcss-loader' //添加浏览器前缀
                    , 'less-loader' //将less转化为css
                ]
            }
        ]
    }
}