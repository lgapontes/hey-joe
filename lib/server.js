const osUtils  = require('os-utils');

var Server = function() {
    this.getCpuStatus = function(callback) {
        osUtils.cpuUsage(function(value){
            var cpuUsage = parseInt(value * 100);
            var cpuFree = 100 - cpuUsage;
            callback([
                cpuUsage,
                cpuFree
            ]);
        });
    };

    this.getConcurrentRequests = function(request,callback) {
        request.socket.server.getConnections(function(error,count){
            callback(error,count);
        });
    };
};

module.exports = {
    Server: Server
};