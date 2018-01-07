var packageJson = require('../package.json')
var toPort = require('hash-to-port');
var compileMode = process.env.compile || ''
compileMode = 'compile' + compileMode + '.js'
var path = require('path')
module.exports = function () {
	return {
		livereloadServerPort:toPort('livereloadServerPort' + compileMode + packageJson.name),
		mockServerPort:toPort('mockServerPort' + compileMode + packageJson.name),
		wepbackServerPort:toPort('wepbackServerPort' + compileMode + packageJson.name),
		renderServerPort:toPort('renderServerPort' + compileMode + packageJson.name),
		user: require(path.join(__dirname, '../', compileMode))
	}
}
