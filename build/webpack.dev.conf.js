var config = require('../config')
var webpack = require('webpack')
// 用于合并文件
var merge = require('webpack-merge')
// 工具方法
var utils = require('./utils')
// 共享的webpack配置文件
var baseWebpackConfig = require('./webpack.base.conf')
// 操作html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  // 启动hot-reload的相关代码
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    // 对一些独立的css文件做处理
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  // 方便源码调试
  devtool: '#eval-source-map',
  plugins: [
    // 把process.env替换，用于作开发／运行不同环境的判断
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),//webpack优化模块
    new webpack.HotModuleReplacementPlugin(),//热加载模块
    new webpack.NoErrorsPlugin(),//编译错误时跳过
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',// 指定生成的文件名
      template: 'index.html',// 指定处理的模板
      inject: true //表示生成的js／css会自动添加到index.html
    })
  ]
})
