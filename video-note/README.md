# webpack-study
学习webpack用的项目

## 学习目标

- [ ] webpack常见配置
- [ ] webpack高级配置
- [ ] webpack优化配置
- [ ] ast抽象语法树
- [ ] webpack中的Tapable
- [ ] webpack流程，手写webpack
- [ ] 手写webpack中常见的loader
- [ ] 手写webpack中常见的plugin

## 什么是webpack
    webpack是一个模块化打包器，分析项目，找到JavsScript模块及其他浏览器不能直接运行的的拓展语言，将其打包成为合适的格式供浏览器使用;

    可以实现 代码转换，文件优化，代码分割，模块合并，自动刷新，代码校验，自动发布

## webpack基础知识

### 预备知识
 - npm或yarn安装时，如果加上 -D，表示这是一个开发依赖，在打包的时候不会引入到工程中；
 - package.json中的`scripts`可以给命令取别名，在运行npm run `别名` 或 yarn run `别名` 时，等同于运行该命令;
 - path模块，可以获取到当前路径的绝对路径:   
    - 用法 引入path模块`const path = require('path')` 获取路径 `path.resolve(__dirname,`当前目录下的相对路径`)`

    - scripts中的命令默认会在当前node_modules下去找可用的执行文件

### 基础知识
- webpack运行在node环境下；  
-  webpack可以通过npm或yarn下载；  
- 如果希望在命令行中执行webpack命令，需要安装webpack-cli，也是通过npm或yarn（后续所有安装都是通过npm或yarn的，不在累赘）；  
- webpack运行完毕后在指定目录(后续会讲如何指定目录)生成打包后的文件，自带模块化支持；  
- webpack在没有配置的情况下也可以运行，但是功能比较弱；  
    - 默认输入文件为`./src/index.js`
    - 默认输出地址为`./dist`
    - 默认打包`mode`为`production`
- webpack命令默认使用的配置文件为`webpack.config.js`和`webpackfile.js`，可以用`--config 文件名` 在命令中指定使用的配置文件；  
  - webpack命令的默认配置文件名是由`webpack-cli`包中`bin/config.config-yargs.js`中的`defaultDescription`项指定；
- 由于webpcack运行在node中，所以`webpack.config.js`是node的写法，用`require`引入，用`module.exports`导出；  
- 可以将常用的webpack相关命令写在`package.json`中，方便使用; 
#### webpack基础配置  
- `entry`：指定入口文件（相对路径）  
- `output`：指定输出路径和文件名  
  - `filename`:指定文件名，[name]表示引用源文件的文件名，[hash]表示生成文件的hash值，[hash:8]表示八位的hash值
  - `path`:文件路径（绝对路径），这里用到了path模块  
- `mode`:默认有两种模式`production`,`development`
  
## webpack打包后文件解析
- 文件中定义了`installedModules`来缓存模块，如果该模块已被缓存则直接返回其`exports`的值
- 文件中定义了`__webpack_require__`函数用来实现模块引用和导出  

**导出文件简化后：**
```javascript
(function (modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
    "./src/index.js": (function (module, exports) {
      eval("console.log('123')\n\n//# sourceURL=webpack:///./src/index.js?");
    })
  });
```


## 常用配置
- `devServer`:开发服务器配置
  - 相关：
    - webpack-dev-server命令打包后的文件不会输出而是存在缓存中
    - 会打开一个本地服务器，默认指向开发文件夹，并将打包后的文件也显示出来（只是显示，并没有输出成文件）
    - 该命令需要安装，devServer为该服务器配置
  - 配置项
    - `port`：端口号，
    - `contentBase`：修改服务器的指向，是当前目录的相对路径
    - `progress`：显示打包进度



## 常用plugin  
### 基础知识
1. 所有的插件都需要安装后引入
2. 插件是对打包的整体做调整（<font color=red>自己的总结不是定义</font>）
### 基础使用方法
```javascript
const Plugin = require('plugin')
module.exports={
    ...
    plugins:[
        new Plugin(options)//Plugin代指我们需要的插件 options为该插件的配置项
    ]
    ...
}
```
### 常用plugin
- `html-webpack-plugin`：根据模板生成html并自动将打包后的js插入该html中
  - `template`：指定打包模板（相对路径（当前工程））
  - `filename`：生成的html名;
  - `hase`：Boolean|是否给插入的js加上哈希戳
  - `minify`：压缩相关配置
    - `removeAttributeQuotes`：Boolean|是否移除html属性的"
    - `collapseWhitespace`：Boolean|是否压缩成一行
- `MiniCssExtractPlugin`：用于打包css，可以生成单独的css文件，使用方法如下
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    ...
    plugins:[new MiniCssExtractPlugin({
        filename:''
    })]
    ...
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    ...
                ]
            }
        ]
    }
}
```
- 

## 常用loader（用于处理指定文件）
### 基础知识
  1. 所有的loader要安装
  2. 一个loader只做一件事
  3. loader有四个类型
     - pre 前置loader，不管位于什么地方，都会在normal loader前执行
     - normal 普通loader，默认为此loader
     - 内联loader 可以在代码中使用，使用方法:`expose-loader?$!jquery`
     - post 后置loader，不管位于什么地方，都会在normal loader后执行  
--- 
### 基础使用方法
```javascript
module.exports={
    ...
    module:{
        rules:[
            {
                test:/\.???$/, //匹配的文件
                // 要用的loader们，单个文件可以直接写loader，不用数组形式
                // loader从下往上，从右往左执行
                use:[   
                    "loader",   //可以直接写loader的名
                    {           //可以写成对象形式，这样可以配置loader的参数
                        loader:"loader",
                        options:{

                        }
                    }
                ]
                enforce:'pre',      //指定loader是什么类型，默认为normal（内联类型无法指定）
                include:"./src",            //指定只解析某个文件/目录
                exclude:"./node_modules"    //指定不解析某个文件/目录      
            }
        ]
    }
    ...
}
```
### 常用loader
- `css-loader`：用来帮助webpack解析 css 文件及 css 文件间@import的引用
- `less-loader`：用来帮助webpack解析 .less文件及 .less 文件之间@import的引用
  - 安装时要一并安装less less-loader依赖less解析 .less 文件
- `postcss-loader`：用来给css加上浏览器前缀
- `style-loader`：将css以style标签的形式插入index中（<font color=red>不推荐，会让index变的很大</font>）
  - `insert`: 插入标签位置，可以用这个选项来控制插入css的优先级
- 
