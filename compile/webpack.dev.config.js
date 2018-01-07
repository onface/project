const webpack = require('webpack')
const glob = require("glob")
var config = require('./getConfig')()

// 扫描获取所有js文件列表
var entryFiles = []
config.user.entry.forEach(function(fileReg){
	entryFiles = entryFiles.concat(glob.sync(fileReg) || [])
})
var entryMap = {}
entryFiles.forEach(function(filePath){
	entryMap[filePath] = [
		'./' + filePath,
		'webpack-hot-middleware/client'
	]
})
// console.log(entryMap)

var webpackConfig = require('./webpack.config.js')({
    entry: entryMap,
    firstPlugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output : {
		publicPath: '/',
	    chunkFilename: '__chunk/[id].js',
	}
})

module.exports = webpackConfig