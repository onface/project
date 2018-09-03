var app = require('fms')
var glob = require('glob')
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
require('../view/render/mock.js')(app)
require('../view/react/mock.js')(app)
require('../view/vue/mock.js')(app)
