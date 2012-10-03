var errorFiles = {
    "404":"./404",

    "500":"./500"

};

var mime = {

    "css":"text/css",

    "gif":"image/gif",

    "html":"text/html",

    "ico":"image/x-icon",

    "jpeg":"image/jpeg",

    "jpg":"image/jpeg",

    "js":"text/javascript",

    "json":"application/json",

    "pdf":"application/pdf",

    "png":"image/png",

    "svg":"image/svg+xml",

    "swf":"application/x-shockwave-flash",

    "tiff":"image/tiff",

    "txt":"text/plain",

    "wav":"audio/x-wav",

    "wma":"audio/x-ms-wma",

    "wmv":"video/x-ms-wmv",

    "xml":"text/xml"

};

var expires = {
    fileMatch:/^(gif|png|jpg|js|css)$/ig,
    maxAge:60 * 60 * 24 * 365
};

var compress = {
    match:/png|css|js|html/ig

};

var welcome = {
    file:"index.html"
};


exports.errorFiles = errorFiles;
exports.mine = mime;
exports.expires = expires;
exports.compress = compress;
exports.welcome = welcome;