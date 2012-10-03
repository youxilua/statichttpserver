/**
 * Created with JetBrains WebStorm.
 * User: MingliC
 * Date: 12-10-3
 * Time: 下午7:55
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');


function start(fileRoute,port) {
    function onRequest(request, response) {
        fileRoute(request, response);
    }
    http.createServer(onRequest).listen(port);
    console.log("Server has started");
}

exports.start = start;