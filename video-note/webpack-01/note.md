# webpack

## webpack安装

- 安装本地的webpack
- webpack webpack-cli -D(-D 表示为开发依赖，上线不需要)

## webpack可以进行0配置

- 打包工具 -> 输出的结果（JS模块）
- 打包 （支持js模块化）

## 手动配置webpack

- 默认配置文件的名字 webpack.config.js
  - 名字不是死的，叫webpack.config.js的原因是 `node_modules/webpack-cli/bin/config/config-yargs.js` 中配置了`defaultDescription: "webpack.config.js or webpackfile.js"`，而我们常用的文件名为webpack.config.js
- 如果要用非默认文件名的配置文件可以在 命令后面加上 --config 文件名
  - 可以写在package.json的script中`"build" :"webpack --config 文件名"`
    - 如果要给package.json 中的命令在命令行中加参数需要额外加 `--` 例如 `package.json中 "build" :"webpack"` 那么在命令行中指定webpack配置文件就要这么写 `npm run build -- --config 文件名`
- `webpack-dev-server` 可以在编译后启动一个服务器来访问当前目录下的文件,相关的配置写在webpack配置文件中的 `devServer` 项中
  ```javascript
    devServer:{
      port:3000,//端口号
        progress:true,//进度条
        contentBase:'./build',//访问的基础路径
        open:true //是否打开浏览器
    }
  ```
- externals 配置项可以指定*特定的引入模块*在打包时忽略
  ```javascript
  externals:{ 
    jquery:'$'  //忽略jquery的引入
  },
  ```
- 插件 对项目整体操作（暂时的理解，$\color{red}{不一定正确}$）
  - 特点：
    - 
  - 常用插件
    - webpack.ProvidePlugin 可以为每个模块都引入特定模块：
      ```javascript
        plugins: [
          new webpack.ProvidePlugin({
            '$':'jquery',     //在每个模块中注入$
          })
        ]
      ```
    - HtmlWebpackPlugin 生成html文件并自动引入打包出来的js文件：
      ```javascript
      new HtmlWebpackPlugin({
              template: './src/index.html',
              filename: 'index.html',
              minify: {
                  removeAttributeQuotes: true, //移除标签上的"
                  // collapseWhitespace: true //文本压缩成一行
              },
              hash: true
          }),
      ```
    - 
- loader 写在module下的rules里面,用来处理某种特定类型的文件：
  - 特点：
    - 一个loader只干一件事
    - use后面单个loader直接写loader，多个loader用数组，处理顺序为从右向左，从下到上执行
    - loader 类型：
      - pre 前置loader；
      - normal 普通loader；
      - 内联loader；可以在代码中使用 使用方式如下：'expose-loader?$!jquery'
      - post 后置loader
  - 常用loader:
    - less-loader
    - postcss-loader
    - css-loader
    - MiniCssExtractPlugin.loader   
      - 将分散的css根据选项打包
    - babel-loader
    - expose-loader<small>(内联模块)</small> 将引入的模块暴露到window上
    - file-loader 
      - 用来处理非代码文件，会将文件在打包目录下生成备份，并在引用的地方返回该备份的url
      - 无法感知在页面中直接引用的file，例如：
      ```html
        <img src='./src/???'>  <!--这种方式无法解析-->
      ```
    - 

疑问：
  
  1. webpack如何让import()引入的模块挂载在全局？
  2. 为什么css-loader要比less-loader,postcss-loader后执行
