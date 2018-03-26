const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
var config = require('./getConfig')()
const FastUglifyJsPlugin = require('fast-uglifyjs-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const glob = require('glob')


var entryFiles = []
config.user.online[config.mode].entry.forEach(function(fileReg){
	entryFiles = entryFiles.concat(glob.sync(fileReg) || [])
})
var entryMap = {}
entryFiles.forEach(function(filePath){
	entryMap[filePath] = [
		'./' + filePath
	]
})
if (JSON.stringify(entryMap) === '{}') {
	console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄')
	throw new Error(`compile/webpack.online.config.js: must have entry\r\n entry: ${JSON.stringify(config.user.online.entry)}`)
}
webpackConfig.entry = entryMap
webpackConfig.output.publicPath = config.user.online[config.mode].domain
webpackConfig.output.chunkFilename = `__chunk/[id]${config.user.online[config.mode].hash?'-[hash]':''}.js'`



webpackConfig.plugins = [
        new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
if (config.user.online[config.mode].compress) {
	webpackConfig.plugins.push(
		new FastUglifyJsPlugin({
			compress: {
	            warnings: false
	        },
			debug: true,
			cache: true,
			cacheFolder: path.resolve(__dirname, '../deploy/_uglify_cache'),
			sourceMap: true
		})
	)
}
webpackConfig.externals = config.user.online.externals
webpackConfig.devtool = 'source-map'
module.exports = webpackConfig
