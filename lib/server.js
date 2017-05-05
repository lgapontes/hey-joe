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
    }
}

module.exports = {
    Server: Server
};