var teleport = require('mosaic-teleport')(Promise);

function Test() {
}
Test.prototype.sayHello = rest('/*name', 'get', function(options) {
    var that = this;
    return Promise.resolve().then(function() {
        var name = options.params.name;
        return {
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                name : name,
                msg : 'Hello, ' + name + '!'
            },
        }
    });
});

var serviceAdapter = new teleport.ServiceAdapter(new Test());
module.exports = teleport.remote.getServerHandler('/', serviceAdapter);

function rest(path, method, f) {
    f.path = path;
    f.method = method;
    return f;
}