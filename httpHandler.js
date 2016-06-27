var teleport = require('mosaic-teleport')(Promise);
function newHandler(service) {
    var adapter = new teleport.ServiceAdapter(service);
    var handler = teleport.remote.getServerHandler('/', adapter);
    return handler;
}
module.exports = newHandler;