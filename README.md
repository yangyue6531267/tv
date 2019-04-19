|- - build                                     // 项目构建（webpack）相关代码  
|      |- - build.js                           // 生产环境构建代码  
|      |- - check-version.js                   // 检查node、npm等版本  
|      |- - dev-client.js                      // 热重载相关  
|      |- - dev-server.js                      // 构建本地服务器  
|      |- - util.js                            // 构建工具相关  
|      |- - vue-loader.conf.js                 // vue文件加载器  
|      |- - webpack.base.conf.js               // webpack基础配置  
|      |- - webpack.dev.conf.js                // webpack开发环境配置  
|      |- - webpack.prod.conf.js               // webpack生产环境配置  
|- - config                                    // 项目开发环境配置  
|      |- - dev.env.js                         // 开发环境变量  
|      |- - index.js                           // 项目一些配置变量  
|      |- - prod.env.js                        // 生产环境变量  
|- - node_modules                              // node模块  
|- -  src                                      // 源码目录  
|      |- - assets                             // 开发环境静态图片资源及文件  
|      |- - components                         // vue公共组件  
|      |- - router                             // vue-router路由配置  
|      |- —js                                  // 非公共的js  
|      |- - style                              // scss预编译文件  
|      |- - App.vue                            // 页面入口文件  
|      |- - main.js                            // 程序入口文件，加载各种公共组件  
|- - static                                    // 静态文件，比如一些图片，json数据等  
|- - .babelrc                                  // ES6语法编译配置  
|- - .editorconfig                             // 定义代码格式  
|- - .gitignore                                // git忽略上传文件  
|- - .postcssrc.js                             //  
|- - .index.html                               // 入口页面  
|- - package.json                              // 项目基本信息  
|- - favicon.ico                               // 项目logo  
|- - README.md                                 // 项目说明  


    


# android_luncher_jingxuan

> vue + vue-router + sass + webpack

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```