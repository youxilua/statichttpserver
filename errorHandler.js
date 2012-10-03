

var config = require('./configs');
var errorFiles = config.errorFiles;

//错误输出
function errorExports(fs, httpErrorCode, response) {
    fs.readFile(errorFiles[httpErrorCode], 'binary', function (err, file) {
        if (err) {
            console.log("500 server error");
        } else {
            response.writeHead(httpErrorCode, {"Context-Type":"text/plain"});
            response.write(file, "binary");
            response.end();
        }
    });
}


exports.errorExports = errorExports;