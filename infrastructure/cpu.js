const osUtils  = require('os-utils');

var Cpu = function() {
    this.getStatus = function(request,callback) {
        osUtils.cpuUsage(function(value){
            var cpuUsage = parseInt(value * 100);
            var cpuFree = 100 - cpuUsage;
            callback(undefined,[
                cpuUsage,
                cpuFree
            ]);
        });
    };
};

var obj = new Cpu();

module.exports = {
    cpu: obj
};