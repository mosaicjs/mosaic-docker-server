var path = require('path');
var baseDir = path.resolve(__dirname, './');
require('babel-core/register')({
    ignore : function(path) {
        path = path.substring(baseDir.length);
        var ignore = false;
        if (path.indexOf('/node_modules/') === 0) {
            ignore = path.indexOf('mosaic') < 0;
        }
        console.log('>>>>', path, path.indexOf('/node_modules/') === 0, ignore);
        // console.log('Load: ', path, 'babel: ', ignore);
        return ignore;
    }
});