module.exports = function (app) {
    app.render('/render', {
        view: 'view/render/index.html',
        data: {
            pass: {
                name: 'nimo'
            }
        }
    })
}
