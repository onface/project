var path = require('path')
var glob = require('glob')
var config = require('../compile/getConfig')()
var mockFiles = glob.sync(`${config.viewPath}/**/mock.js`, {
    root: config.rootPath,
    realpath: true
})
var startFilePath = path.resolve(__dirname, config.view + '.js')
var mockConfig = {
    dataAutoFill: [
        {
            key: 'type',
            replace: 'rType',
            replaceResponseType: {
//                 'pass': 'success',
//                 'fail': 'error',
                '::default': 'pass'
            }
        },
//         {
//             key: 'data',
//             replace: 'root',
//             replaceRootIgnore: ['msg']
//         }
    ],
    renderRoot: path.join(config.rootPath, 'output'),
    static: path.join(config.rootPath, 'output'),
    render: {
        engine: 'php'
    },
    renderEngine: {
        'php': {
            server: 'http://127.0.0.1:' + config.renderServerPort
        }
    },
    port: config.mockServerPort
}
require(startFilePath)(mockFiles, mockConfig)
