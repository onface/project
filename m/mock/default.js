var app = require('fms')
var config = require('../../compile/getConfig')()
module.exports = function (mockFiles) {
    require('./render/php')
    app.run(
        config.mockSettings({
            view: {
                data: {}
            }
        })
    )
    mockFiles.map(function (file) {
        require(file)(app)
    })
}
