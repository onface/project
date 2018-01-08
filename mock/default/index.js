var app = require('fms')
require('../render')
require('../../compile/livereload')
var config = require('../../compile/getConfig')()
app.run(
    config.mockSettings({
        view: {
            data: {}
        }
    })
)

/* ========= 模拟配置 =============== */
app.view({
    url: '/example',
    template: '/view/example/index.html'
})
