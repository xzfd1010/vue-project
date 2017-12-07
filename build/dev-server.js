var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
// HTTP 代理的中间件
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 定义端口号
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 代理
var proxyTable = config.dev.proxyTable
// 启动express
var app = express()

//编写接口
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller',function(req,res){
  res.json({
    // 通过error number来标识返回状态正常
    errno:0,
    // 具体数据
    data:seller
  })
})

apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  })
})

apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno:0,
    data:ratings
  })
})

app.use('/api',apiRoutes);

// 启动webpack，compiler是给中间件用的
var compiler = webpack(webpackConfig)

// 指定静态资源的访问目录
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 静态资源的访问目录
  publicPath: webpackConfig.output.publicPath,
  // 编译好的东西放在内存中，目录中并没有
  stats: {
    colors: true,
    chunks: false
  }
})

// express和webpack的hotReload的插件
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 代理转发的中间件
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 使用中间件
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// 配置访问路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(staticPath, express.static('./static'))

// 启动express访问端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
