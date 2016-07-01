var teleport = require('mosaic-teleport')(Promise);
module.exports = function(service) {
    return teleport.remote.getServerHandler('/', //
    new teleport.ServiceAdapter(service));
}