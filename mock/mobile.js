var app = require('fms')
require('./render')
require('../compile/livereload')
var config = require('../compile/getConfig')()
app.run(
    config.mockSettings({
        view: {
            data: {}
        }
    })
)
