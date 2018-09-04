var open = require("open")
var config = require('./getConfig')()
var request = require('request')
var url = "http://127.0.0.1:" + config.mockServerPort
open(url)
