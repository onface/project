require('jQuery/src/core.js')
var $ = require('jQuery/src/ajax.js')
$.ajax({
    url: '/some',
    data: {
        da: '1'
    },
    type: 'get'
}).always(function () {
    console.log("done")
})
