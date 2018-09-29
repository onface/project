var Webmock = require('webmock')
var config = require('../../compile/getConfig')()
var path = require('path')
module.exports = function (mockFiles) {
    var { mock, app} = Webmock.express({
        port: config.mockServerPort,
        renderViewRoot: path.join(config.rootPath, 'output'),
        static: path.join(config.rootPath, 'output')
    })
    setTimeout(function () {
        // last connect
    }, 0)
    mockFiles.map(function (file) {
        require(file)(mock, app)
    })
}
