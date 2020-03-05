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
    webpack是一个模块化打包器，分析项目，找到JavsScript模块及其他浏览器不能直接运行的的拓展语言，将其打包成为合适的格式供浏览器使用
    可以实现 代码转换，文件优化，代码分割，模块合并，自动刷新，代码校验，自动发布

## webpack基础知识

### 预备知识
    npm或yarn安装时，如果加上 -D，表示这是一个开发依赖，在打包的时候不会引入到工程中；
    package.json中的`scripts`可以给命令取别名，在运行npm run `别名` 或 yarn run `别名` 时，等同于运行该命令
    path模块，可以获取到当前路径的绝对路径  
        用法 引入path模块`const path = require('path')` 获取路径 `path.resolve(__dirname,`当前目录下的相对路径`)`
---
### 基础知识
webpack运行在node环境下；  
webpack可以通过npm或yarn下载；  
如果希望在命令行中执行webpack命令，需要安装webpack-cli，也是通过npm或yarn（后续所有安装都是通过npm或yarn的，不在累赘）；  
webpack运行完毕后在指定目录(后续会讲如何指定目录)生成打包后的文件，自带模块化支持；  
webpack在没有配置的情况下也可以运行，但是功能比较弱；  
    默认输入文件为`./src/index.js`
    默认输出地址为`./dist`
    默认打包mode为`production`
webpack命令默认使用的配置文件为webpack.config.js和webpackfile.js，可以用--config 文件名 在命令中指定使用的配置文件；  
  - webpack命令的默认配置文件名是由webpack-cli包中bin/config.config-yargs.js中的defaultDescription项指定；
由于webpcack运行在node中，所以webpack.config.js是node的写法，用require引入，用module.exports导出；  
可以将常用的webpack相关命令写在package.json中，方便使用;
#### webpack基础配置  
`entry`：指定入口文件（相对路径）  
`output`：指定输出路径和文件名  
    `filename`:指定文件名
    `path`:文件路径（绝对路径），这里用到了path模块
`mode`:默认有两种模式`production`,`development`
## webpack打包后文件解析
webpack打包后生成的文件中 实现了 __webpack_require__ 函数用来实现模块引用
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