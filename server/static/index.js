(function(context) {
    $(function() {
        var mapElement = $('#map');
        var center = mapElement.data('center');
        var zoom = mapElement.data('zoom');
        var minZoom = mapElement.data('min-zoom') || 2;
        var maxZoom = mapElement.data('max-zoom') || 18;

//        console.log('center:', center);
//        console.log('minZoom:', minZoom);
//        console.log('maxZoom:', maxZoom);
//        console.log('zoom:', zoom);
        
        var layerElements = $('.map-layer');
        var layers = [];
        layerElements.each(function(){
            var layerElement = $(this);
            var tilesUrl = layerElement.data('tiles-url');
//            console.log('>>', tilesUrl);
            if (!tilesUrl)
                return ;
            var utfgridUrl = layerElement.data('utfgrid-url');
            var attributionElm = layerElement.find('.attribution');
            var template = layerElement.find('.template');
            var attribution = attributionElm.html();

//            console.log('* Layer: ');
//            console.log('     tilesUrl:', tilesUrl);
//            console.log('   utfgridUrl:', utfgridUrl);

            var tiles = L.tileLayer(tilesUrl, {
                attribution : attribution,
                minZoom : minZoom,
                maxZoom : maxZoom,
            });
            layers.push(tiles);
            
            if (utfgridUrl) {
                var utfGrid = new L.UtfGrid(utfgridUrl);
                layers.push(utfGrid);
                utfGrid.on('mouseover', function(ev) {
                    showInfo(ev.data, template);
                })
            }
        });
        mapElement.html('');
        var map = L.map(mapElement[0]);
        layers.forEach(function(layer){
            map.addLayer(layer);
        })

        map.setView(center, zoom);

        map.on('click', function(e) {
            console.log(map.getZoom() + ' [' + e.latlng.lng + ','
                    + e.latlng.lat + ']');
        })

    });
    function showInfo(data, template) {
        var panel = $('#info');
        panel.html(template);
        panel.find('[data-placeholder]').each(function() {
            var elm = $(this);
            var field = elm.data('placeholder');
//            console.log(' * field:', field, data[field]);
            elm.text(data[field]);
        })
        panel.show();
    }

})(this);