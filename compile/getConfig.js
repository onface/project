var packageJson = require('../package.json')
var toPort = require('hash-to-port'); 

module.exports = function () {
	return {
		liverePort:toPort('liverePort'+packageJson.name),
		mockServerPort:toPort('mockServerPort'+packageJson.name),
		wepbackServerPort:toPort('wepbackServerPort'+packageJson.name),
	}
}