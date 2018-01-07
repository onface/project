var config = require('../../compile/getConfig')()
var app = require('fms')
var path = require('path')

require('../render')
require('../../compile/livereload')

var webpackServerUrl = 'http://127.0.0.1:' + config.wepbackServerPort
var renderServerUrl = 'http://127.0.0.1:' + config.renderServerPort
app.run({
    port: config.mockServerPort,
    proxy404: webpackServerUrl,
    connect: function (req, res, next) {
       if (req.url === '/__webpack_hmr') {
           res.redirect(webpackServerUrl + '/__webpack_hmr')
           return
       }
       next()
   },
   view: {
       server: renderServerUrl,
       data: {},
       templateDir: './output/'
   },
   static: path.join(__dirname, '../../output'),
})

/* ========= 模拟配置 =============== */
app.view({
    url: '/example',
    template: 'view/example/index.html'
})
