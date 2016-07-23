var teleport = require('mosaic-teleport')(Promise);

function Test(name) {
    this.name = name;
}
Test.prototype.sayHello = rest('/*name', 'get', function(options) {
    var that = this;
    return Promise.resolve().then(function() {
        return {
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                name : that.name,
                msg : 'Hello, ' + options.params.name + ' (' + that.name + ')!'
            },
        }
    });
});

var serviceAdapter = new teleport.ServiceAdapter(new Test('Blah-Blah'));
module.exports = teleport.remote.getServerHandler('/', serviceAdapter);

function rest(path, method, f) {
    f.path = path;
    f.method = method;
    return f;
}