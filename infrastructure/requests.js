const fs = require('fs');

var Requests = function() {
    this.getStatus = function(request,callback) {
        request.socket.server.getConnections(function(error,count){
            callback(error,count);
        });
    };
};

var obj = new Requests();

module.exports = {
    requests: obj
};