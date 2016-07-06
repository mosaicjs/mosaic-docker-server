var d3_ease = require('d3-ease');
var transform = require('mosaic-transform').transform;

function newGenerator() {
    var countryLines = transform([ 0, 15 ], [ 0.5, 1 ], d3_ease.easeQuadIn);
    var opacity = transform([ 0, 15 ], [ 1, 0 ], d3_ease.easeQuadIn);
    return function(zoom) {
        var result = {};
        var opacity = 1;
        return {
            '[ISO3="FRA"]' : {
                'polygon-fill' : '#eee',
            },
            '[ISO3!="FRA"]' : {
                'polygon-fill' : 'white',
                'polygon-opacity' : opacity,
            },
            'line-width' : countryLines(zoom),
            'line-opacity' : opacity,
            'line-color' : '@border',
            'polygon-fill' : '@land',
            'polygon-gamma' : 0.5,
            'line-smooth' : 1,
            'polygon-smooth' : 1
        }
    }
}
module.exports = function(options) {
    var generator = newGenerator();
    options = options || {};
    var styles = {};
    for (var z = 0; z <= 22; z++) {
        var style = generator(z);
        styles['[zoom=' + z + ']'] = style;
    }
    return styles;
}
