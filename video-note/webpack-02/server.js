const express = require('express');
const webpack = require('webpack');
// 需要中间件
const middle =require('webpack-dev-middleware');
// 获取webpack配置
const config =require('./webpack.config'); 
const compiler= webpack(config);

const app = express();
app.use(middle(compiler));
app.get('/user', (req, res) => {
    res.json({ 'text': '123' })
})
app.listen(3000);