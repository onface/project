const webpack = require('webpack')
const compiler = webpack(require('./webpack.dev.config.js'))
const config = require('./getConfig.js')()
const path = require('path')
const express = require('express')
const app = express()

// express.static(root)   负责托管 Express 应用内的静态资源
// app.user([path])   Mounts the middleware function(s) at the path. If path is not specified, it defaults to “/”.
app.use(express.static(path.join(__dirname, '../output')))
app.use(require("webpack-dev-middleware")(compiler, {
	publicPath: '/',
}))
app.use(require("webpack-hot-middleware")(compiler))

app.listen(config.wepbackServerPort)
console.log('http://localhost:' + config.wepbackServerPort)
