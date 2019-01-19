module.exports = function (app) {
    app.render('/_example_php_render', {
        view: 'view/_example_php_render/index.html',
        data: {
            pass: {
                name: 'nimo'
            }
        }
    })
}
