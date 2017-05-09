const osUtils  = require('os-utils');
const disk = require('diskusage');

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

    this.getDiskUsage = function(callback) {
        let path = os.platform() === 'win32' ? 'c:' : '/';
        disk.check(path, function(error, info) {
            if (error) {
                callback(error);
            } else {
                let available = parseInt( (info.available * 100) / info.total );
                let free = 100 - available;
                callback(undefined,[
                    available,
                    free
                ]);
            }
        });
    };
};

module.exports = {
    Server: Server
};