var ecstatic = require('ecstatic');
var TilesGenerator = require('mosaic-mapnik').tiles.TilesGenerator;
var teleport = require('mosaic-teleport')(Promise);

var tilesGenerator = new TilesGenerator({
    baseDir : __dirname + '/tiles',
    ttl : 60 * 15, // TTL for Mapnik XML configuration files is 15 minutes
    cacheDir : __dirname + '/tiles/.cache'
});

var service = {
    handler : rest('/:z/:x/:y/tile.:type', 'get', function(options) {
        return Promise.resolve().then(function() {
            var params = options.params || {};
            params.z = +params.z;
            params.x = +params.x;
            params.y = +params.y;
            params.format = params.format || params.type || 'png';
            return tilesGenerator.loadTile(options);
        }).then(function(results) {
            results.data = results.tile || results.data;
            delete results.tile;
            return results;
        });
    })
};

var serviceAdapter = new teleport.ServiceAdapter(service);
var tilesHandler = teleport.remote.getServerHandler('/', serviceAdapter);
var staticHandler = ecstatic({
    root : __dirname + '/static',
    handleError : false,
});
module.exports = function(req, res, next) {
    req.url = req.params.path;
    staticHandler(req, res, function() {
        res.status(200);
        tilesHandler(req, res, next);
    });
}

function rest(path, method, f) {
    f.path = path;
    f.method = method;
    return f;
}