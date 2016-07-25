var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();

app.use(bodyParser.json({
    limit : '20mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended : true
})); // for parsing application/x-www-form-urlencoded

// require('./babel');

var configPath = path.resolve(__dirname, '../.config/server.port');
var port = fs.readFileSync(configPath, 'utf8') || 9876;
var basePath = '/';
var baseDir = __dirname;

function serviceHandler(req, res, next) {
    return Promise.resolve().then(function() {
        var params = req.params = req.params || {};
        params.path = '/' + (params['0'] || '');
        delete params['0'];
        var service = params.service;
        var modulePath = '../applications/' + service;
        return Promise.resolve().then(function() {
            return require(modulePath);
        }).then(function(module) {
            return module(req, res, next);
        }, function(err) {
            console.log('[ERROR]', err, err.stack);
            return next();
        });
    }).then(null, function(err) {
        res.status(500).send({
            error : err.stack,
            params : req.params
        });
    });
};

app.use(basePath + ':service/*', upload.array(), serviceHandler);
// app.get(basePath + 'service/:service/*', serviceHandler);

app.use(basePath, ecstatic({
    root : baseDir + '/static/',
    handleError : true
}));

http.createServer(app).listen(port);
console.log('Listening on :' + port);
