var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');
var path = require('path');
var app = express();

var port = 9876;
var basePath = '/';
var baseDir = __dirname;

app.get(basePath + 'service/:service/*', function(req, res, next) {
    return Promise.resolve().then(function() {
        var params = req.params = req.params || {};
        params.path = '/' + (params['0'] || '');
        delete params['0'];
        var service = params.service;
        var modulePath = './service/' + service;
        return Promise.resolve().then(function(){
            return require(modulePath);
        }).then(function(module){
            return module(req, res, next);
        }, function(err){
            console.log('[ERROR]', err, err.stack);
            return next();
        });
    }).then(null, function() {
        res.status(500).send({
            error : err.stack,
            params : req.params
        });
    });
});

app.use(basePath, ecstatic({
    root : baseDir + '/static/',
    handleError : true
}));

http.createServer(app).listen(port);
console.log('Listening on :' + port);
