const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
var config = require('./getConfig')()
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

Object.keys(webpackConfig.entry).forEach(function (key) {
    if (/^m\//.test(key)) {
        delete webpackConfig.entry[key]
    }
    else {
        webpackConfig.entry[key] = webpackConfig.entry[key].filter(function (key) {
            return key !== 'webpack-hot-middleware/client'
        })
    }
})

webpackConfig.output.publicPath = config.domain
webpackConfig.output.chunkFilename = `__chunk/[id]${config.user.online.hash?'-[hash]':''}.js'`

webpackConfig.plugins = [
        new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            cache: true
        })
    ]
module.exports = webpackConfig
