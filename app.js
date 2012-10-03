/**
 * Created with JetBrains WebStorm.
 * User: MingliC
 * Date: 12-10-3
 * Time: 下午5:28
 * To change this template use File | Settings | File Templates.
 */

var server = require('./server');
var fileRoute = require('./fileRoute');
server.start(fileRoute.fileRoute);


