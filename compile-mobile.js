var compile = require('./compile')
compile.entry = [
    '{view_mobile,m}/**/**entry.js'
]
compile.moduleTemplateDefaultData = {
    type: 'view_mobile',
}
module.exports = compile
