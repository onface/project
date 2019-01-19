var config = require('../../compile/getConfig')()
var exec = require('child_process').exec;
var request = require('request')
request('http://127.0.0.1:' + config.renderServerPort, function (err, res, body) {
    if (!body) {
        exec('php -S 127.0.0.1:' + config.renderServerPort + ' -t ./mock/render', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error.message);
            }
        })
    }
    console.log('PHP template render server: ' + 'http://127.0.0.1:' + config.renderServerPort)
})
