const fs = require('fs');
const isBuffer = require('is-buffer');
const utf8 = require('utf8');

/**
 * Count bytes in a string's UTF-8 representation.
 *
 * @param   string
 * @return  int
 */
function getByteLen(normal_val) {
    // Force string type
    normal_val = String(normal_val);

    var byteLen = 0;
    for (var i = 0; i < normal_val.length; i++) {
        var c = normal_val.charCodeAt(i);
        byteLen += c < (1 <<  7) ? 1 :
                   c < (1 << 11) ? 2 :
                   c < (1 << 16) ? 3 :
                   c < (1 << 21) ? 4 :
                   c < (1 << 26) ? 5 :
                   c < (1 << 31) ? 6 : Number.NaN;
    }
    return byteLen;
};

var Requests = function() {
    this.getStatus = function(request,callback) {
        request.socket.server.getConnections(function(error,count){
            callback(error,count);
        });
    };
    this.getFileSize = function(path,callback) {
        try {
            var stats = fs.statSync(path);
            callback( undefined , stats.size / 1024 );
        }
        catch(err) {
            callback(err);
        }
    };
    this.getStringSize = function(obj,callback) {
        try {
            if (isBuffer(obj)) {
                callback( undefined , getByteLen(obj.toString('utf8')) / 1024 );
            } else {
                if ((obj !== undefined) && ((typeof obj) == "string")) {
                    let str = utf8.encode(obj);
                    callback( undefined , getByteLen(str) / 1024 );
                }
            }
        }
        catch(err) {
            callback(err);
        }
    }
};

var obj = new Requests();

module.exports = {
    requests: obj
};