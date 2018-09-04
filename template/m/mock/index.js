var path = require('path')
var glob = require('glob')
require('../../compile/livereload')
var config = require('../../compile/getConfig')()
var mockFiles = glob.sync(`${config.viewPath}/**/mock.js`, {
    root: config.rootPath,
    realpath: true
})
var startFilePath = path.resolve(__dirname, config.mode + '.js')
require(startFilePath)(mockFiles)
