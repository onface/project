var config = require('../../compile/getConfig')()
var exec = require('child_process').exec;
exec('php -S 127.0.0.1:' + config.renderServerPort + ' -t ./mock/render', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
console.log('Render Server: ' + 'http://127.0.0.1:' + config.renderServerPort)
