var $ = require('jquery')
$.ajax({
    url: '/some',
    data: {
        da: '1'
    },
    type: 'get'
}).always(function () {
    console.log("done")
})
