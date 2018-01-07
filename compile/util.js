const lodash = require('lodash')
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
    }
}
