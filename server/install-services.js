var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var serviceDir = path.resolve(__dirname, '../services');
var files = fs.readdirSync(serviceDir);
var promises = [];
files.forEach(function(file) {
    var filePath = path.join(serviceDir, file);
    var stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
        var promise = runNpmInstall(filePath).then(function(output) {
            console.log('[OK] ', filePath, output.stdout, '\n', output.stderr);
        }, function(err) {
            console.log('[ERROR]', filePath, err, err.stack);
        })
        promises.push(promise);
    }
})
return Promise.all(promises).then(function() {
    console.log('Done.');
})

function runNpmInstall(dir) {
    return new Promise(function(resolve, reject) {
        exec('npm install', {
            cwd : dir,
            maxBuffer : 50 * 1024 * 1024
        }, function(err, stdout, stderr) {
            if (err)
                return reject(err);
            resolve({
                stdout : stdout,
                stderr : stderr
            });
        });
    })

}
