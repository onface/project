var packageJson = require('../package.json')
var toPort = require('hash-to-port');
var extend = require('extend');
var path = require('path')
var mode = 'default'
var extend2 = require('extend2')
if (process.env.mode) {
	mode = process.env.mode
}
var defaultUserConfig = require(path.join(__dirname, '../compile.default.js'))
var modeUserConfig = require(path.join(__dirname, '../compile.' + mode + '.js'))
var userConfig = extend2(true, extend(true, {}, defaultUserConfig), modeUserConfig)
module.exports = function () {
	var view = process.env.view?process.env.view: 'default'
	var viewPath = 'view'
	if (view !== 'default') {
		viewPath = 'view_' + view
	}
	var config = {
		rootPath: path.resolve(__dirname, '../'),
		mode: mode,
		view: view,
		viewPath: viewPath,
		livereloadServerPort:toPort('livereloadServerPort' + userConfig.name),
		mockServerPort:toPort('mockServerPort' + view + userConfig.name),
		wepbackServerPort:toPort('wepbackServerPort' + userConfig.name),
		renderServerPort:toPort('renderServerPort' + userConfig.name),
		user: userConfig
	}
	if (typeof config.user.release[config.view] !== 'object') {
		throw new Error(`You need set /compile.js  release["${config.view}"] = {/*...*/}`)
	}

	config.mockSettings = function (settings) {
		var webpackServerUrl = 'http://127.0.0.1:' + config.wepbackServerPort
		var renderServerUrl = 'http://127.0.0.1:' + config.renderServerPort
		return extend(true,{
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
			   templateDir: './output'
		   },
		   static: './output',
		},settings)
	}
	return config
}
