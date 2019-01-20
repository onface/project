const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
var config = require('./getConfig')()
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var entryFiles = []
entryFiles = entryFiles.concat(glob.sync(config.viewPath + '/' + '**/**entry.js') || [])
var entryMap = {}
entryFiles.forEach(function(filePath){
	entryMap[filePath] = [
		'./' + filePath
	]
})
if (JSON.stringify(entryMap) === '{}') {
	console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄')
	throw new Error(`compile/webpack.release.config.js: must have entry\r\n entry: ${JSON.stringify(config.user.release.entry)}`)
}
webpackConfig.entry = entryMap
webpackConfig.output.publicPath = config.user.release[config.view].domain

webpackConfig.plugins = [
		new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
			'process.env': {
			    NODE_ENV: '"production"'
			 }
        })
    ].filter(function (item) {return item})
let chunkHashName = ''
if (config.user.release[config.view].hash) {
	chunkHashName = '_[hash]'
}
if (config.user.release[config.view].compress) {
	webpackConfig.optimization = {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				sourceMap: Boolean(config.user.release[config.view].sourceMap)
			})
		]
	}
}
webpackConfig.mode = 'production'
webpackConfig.output.chunkFilename = `${config.viewPath}/__chunk/[id]${chunkHashName}${config.user.release[config.view].hash?'-[hash]':''}.js`
webpackConfig.externals = config.user.release[config.view].externals
if (config.user.release[config.view].sourceMap) {
	webpackConfig.devtool = config.user.release[config.view].sourceMap
}
module.exports = config.user.webpackConfigRelease(webpackConfig)
