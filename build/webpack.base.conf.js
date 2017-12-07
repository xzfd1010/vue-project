var path = require('path')
var config = require('../config')
var utils = require('./utils')
// 定义当前项目的根目录
var projectRoot = path.resolve(__dirname, '../'); // 回到vue-sell根目录
// webpack的基本配置
module.exports = {
  // 入口配置，表示webpack的入口配置文件
  entry: {
    app: './src/main.js'
  },
  // 输出配置
  output: {
    // 输出的文件路径
    path: config.build.assetsRoot,
    // 请求的静态资源的绝对路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // name用到的就使用entry的key
    filename: '[name].js'
  },
  // 模块的相关配置
  resolve: {
    // 在require中可以自动补全的字符
    extensions: ['', '.js', '.vue'],
    // require找不到时，去node_modules中找
    fallback: [path.join(__dirname, '../node_modules')],
    // 别名，缩短路径字符串长度
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    // 和上面fallback功能类似
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    // 对某种类型的文件应用某一个loader去做处理，webpack编译阶段就是用各种loader对各种文件进行处理，preloaders会在loaders之前处理
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // 只检查此目录下的文件
        include: projectRoot,
        // 排除此目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      // 对图片文件的处理
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          // 文件小于10kb，生成base64串，打包到编译后的js文件里；大于10kb，单独生成一个文件
          limit: 10000,
          // 设置名称规则
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 对字体文件的处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 控制hash字符串7位
        }
      }
    ]
  },
  // es错误时，提示友好错误信息
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  // 对vue中css文件的loader
  vue: {
    loaders: utils.cssLoaders()
  }
};
