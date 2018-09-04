var livereload = require('livereload')
var config = require('./getConfig')()
var util = require('./util')
var path = require('path')
util.portIsOccupied(config.livereloadServerPort, function (listened) {
    if (listened) {
        console.log('Livereload has been launched')
    }
    else {
        var lrserver = livereload.createServer({
            port: config.livereloadServerPort,
            delay: 100,
            exclusions: [/\\.git\//, /\\.svn\//, /\\.hg\//, /\.js/]
        })
        var watchPath = path.join(__dirname, '../output')
        lrserver.watch(watchPath)
        console.log('Livereload: http://127.0.0.1:' + config.livereloadServerPort + '\n\t' + watchPath)
    }
})
