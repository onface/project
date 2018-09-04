var packageJson = require('../package.json')
var toPort = require('hash-to-port');
var extend = require('extend');
var path = require('path')
module.exports = function () {
	var mode = process.env.mode?process.env.mode: 'default'
	var viewPath = 'view'
	if (mode !== 'default') {
		viewPath = 'view_' + mode
	}
	var config = {
		rootPath: path.resolve(__dirname, '../'),
		mode: mode,
		viewPath: viewPath,
		livereloadServerPort:toPort('livereloadServerPort' + packageJson.name),
		mockServerPort:toPort('mockServerPort' + mode + packageJson.name),
		wepbackServerPort:toPort('wepbackServerPort' + packageJson.name),
		renderServerPort:toPort('renderServerPort' + packageJson.name),
		user: require(path.join(__dirname, '../compile.js'))
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
