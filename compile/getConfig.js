var packageJson = require('../package.json')
var toPort = require('hash-to-port');
var extend = require('extend');
var compileMode = process.env.compile || ''
if (compileMode) {
	compileMode = '-' + compileMode
}
compileMode = 'compile' + compileMode + '.js'
var path = require('path')
module.exports = function () {
	var config = {
		livereloadServerPort:toPort('livereloadServerPort' + compileMode + packageJson.name),
		mockServerPort:toPort('mockServerPort' + compileMode + packageJson.name),
		wepbackServerPort:toPort('wepbackServerPort' + compileMode + packageJson.name),
		renderServerPort:toPort('renderServerPort' + compileMode + packageJson.name),
		user: require(path.join(__dirname, '../', compileMode)),
		mode: process.env.compile || ''
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
			   templateDir: './output/'
		   },
		   static: './output',
		},settings)
	}
	return config
}
