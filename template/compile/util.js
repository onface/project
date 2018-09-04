const lodash = require('lodash')
const net = require('net')
module.exports = {
    getClassNames: function (html) {
        var classNames = []
        html.replace(/class=\"([^"]*?)\"/g, function (_, $1) {
            if ($1) {
                classNames = classNames.concat($1.split(' '))
            }
        })
        classNames = lodash.uniq(classNames)
        classNames = classNames.map(function (item) {
            item = '.' + item
            return item
        })
        return classNames
    },
    portIsOccupied: function portIsOccupied (port, callback) {
      var server = net.createServer().listen(port)
      server.on('listening', function () {
            server.close()
            callback(false)
      })
      server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            callback(true)
        }
      })
    }
}
