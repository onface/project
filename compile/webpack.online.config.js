const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const glob = require("glob")

var config = require('./getConfig')()

// 扫描获取所有js文件列表
var entryFiles = []
config.user.entry.forEach(function(fileReg){
    entryFiles = entryFiles.concat(glob.sync(fileReg) || [])
})
entryFiles = entryFiles.filter(function(filePath){
    return !/^m\//.test(filePath)
})
var entryMap = {}
entryFiles.forEach(function(filePath){
    entryMap[filePath] = ['./' + filePath]
})

console.log(entryMap)

var webpackConfig = require('./webpack.config.js')({
    entry: entryMap,
    lastPlugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            cache: true
        })
    ],
    output : {
        publicPath: config.domain,
        chunkFilename: `__chunk/[id]${config.user.online.hash?'-[hash]':''}.js'`,
    }
})

module.exports = webpackConfig