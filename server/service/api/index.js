var MosaicService = require('mosaic-api-service').MosaicService;
var teleport = require('mosaic-teleport')(Promise);
var PgConfig = require('../../libs/PgConfig');

module.exports = Promise.resolve().then(function() {
    var dbConf = PgConfig.getDbConfig();
    var service = new MosaicService({
        baseDir : __dirname,
        db : dbConf,
        locale : 'french',
    });
    var serviceAdapter = new teleport.ServiceAdapter(service);
    return teleport.remote.getServerHandler('/', serviceAdapter);
});
