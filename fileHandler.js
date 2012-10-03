var mime = require("./configs").mine;
var fileExpires = require("./configs").expires;
var compress = require("./configs").compress;
var zlib = require("zlib");
var error = require('./errorHandler');
var fs = require('fs');
var welcome = require("./configs").welcome;
var path = require('path');
var utils = require("./utils");


function writeFileResponse(raw, request, response, ext, statusCode) {
    var ext = ext ? ext.slice(1) : 'unknown';
    var contentType = mime[ext] || "text/plain";
    var acceptEncoding = request.headers['accept-encoding'] || "";

    console.log("acceptEncoding-->" + acceptEncoding);

    var stream = raw;

    if (ext.match(fileExpires.fileMatch)) {
        console.log("file match");
        var expires = new Date();
        expires.setTime(expires.getTime() + fileExpires.maxAge * 1000);
        // response.writeHead(200,{'Content-Type': contentType,"Expires":expires.toUTCString(),"Cache-Control":"max-age=" + fileExpires.maxAge})
        response.setHeader("Expires", expires.toUTCString());
        response.setHeader("Cache-Control", "max-age=" + fileExpires.maxAge);
    }

    if (compress.match && acceptEncoding.match(/\bgzip\b/)) {
        console.log("gzip match");
        response.setHeader('Content-Encoding', 'gzip');

        stream = raw.pipe(zlib.createGzip());
    } else if (compress.match && acceptEncoding.match(/\bdeflate\b/)) {

        console.log("deflate gzip match");
        response.setHeader('Content-Encoding', 'deflate');

        stream = raw.pipe(zlib.createDeflate());
    }

    response.writeHead(statusCode);

    stream.pipe(response);


};

function filePathHandle(realPath, request, response){
    function pathHandle(err, stats){
        if(err){
            console.log("file not found" + err);
            error.errorExports(fs, 404, response);
        }else{
            console.log("file found - >" + err);

            if(stats.isDirectory()){
                console.log("isDirectory" + realPath);
                realPath = path.join(realPath, "/", welcome.file);
                filePathHandle(realPath, request, response);
            }

            var lastModified = stats.mtime.toUTCString();

            var ifModifiedSince = "If-Modified-Since".toLowerCase();

            response.setHeader("Last-Modified", lastModified);

            if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                console.log("304");
                response.writeHead(304, "Not Modified");
                response.end();

            }else{
                var ext = path.extname(realPath);
                console.log("file read" + ext);
                if (request.headers["range"]) {

                    var range = utils.parseRange(request.headers["range"], stats.size);

                    if (range) {

                        response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);

                        response.setHeader("Content-Length", (range.end - range.start + 1));

                        var raw = fs.createReadStream(realPath, {"start":range.start, "end":range.end});
                        writeFileResponse(raw, request, response, ext, 206);
                        // compressHandle(raw, 206, "Partial Content");

                    } else {

                        response.removeHeader("Content-Length");

                        response.writeHead(416, "Request Range Not Satisfiable");

                        response.end();

                    }

                }else{
                    var raw = fs.createReadStream(realPath);

                    writeFileResponse(raw, request, response, ext, 200);
                }

            }

        }
    }

    fs.stat(realPath, pathHandle);
}


//exports.fileResponse = writeFileResponse;
exports.pathHandler = filePathHandle;
