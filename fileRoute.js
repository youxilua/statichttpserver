/**
 * Created with JetBrains WebStorm.
 * User: MingliC
 * Date: 12-10-3
 * Time: 下午10:26
 * To change this template use File | Settings | File Templates.
 */

var path = require('path');
var url = require('url');
var welcome = require("./configs").welcome;
var pathHandler = require("./fileHandler");

function fileRoute(request, response) {
    var pathName = url.parse(request.url).pathname;
    if (pathName.slice(-1) === "/") {
        pathName = pathName + welcome.file;
    }
    //获取后缀名
    var ext = path.extname(realPath);
    //获得文件真实路径
    var realPath = path.join("assets", path.normalize(pathName.replace(/\.\./g, "")));
    console.log("pathName->" + realPath);
    pathHandler.pathHandler(realPath,request, response);
}

exports.fileRoute = fileRoute;