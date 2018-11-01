var Webmock = require('webmock')
var config = require('../../compile/getConfig')()
var path = require('path')
var proxy = require('express-http-proxy')
require('./render/php.js')
module.exports = function (mockFiles) {
    var { mock, app} = Webmock.express({
        port: config.mockServerPort,
        renderRoot: path.join(config.rootPath, 'output'),
        static: path.join(config.rootPath, 'output'),
        render: {
            engine: 'php'
        }
    })
    setTimeout(function () {
        // last connect
        app.use(proxy('http://127.0.0.1:' + config.wepbackServerPort))
    }, 10)
    mockFiles.map(function (file) {
        require(file)(mock, app)
    })
}
