var TilesGenerator = require('mosaic-mapnik').tiles.TilesGenerator;
var tilesGenerator = new TilesGenerator({
    baseDir : __dirname,
    ttl : 60 * 15, // TTL for Mapnik XML configuration files is 15 minutes
    cacheDir : __dirname + '/.cache'
});

module.exports = require('../../libs/serviceExport')({
    handler : rest('/:z/:x/:y/tile.:type', 'get', function(options) {
        return Promise.resolve().then(function() {
            var params = options.params || {};
            params.z = +params.z;
            params.x = +params.x;
            params.y = +params.y;
            params.format = params.format || params.type || 'png';
            return tilesGenerator.loadTile(options);
        }).then(function(results) {
            results.data = results.tile || results.data;
            delete results.tile;
            return results;
        });
    })
});

function rest(path, method, f) {
    f.path = path;
    f.method = method;
    return f;
}