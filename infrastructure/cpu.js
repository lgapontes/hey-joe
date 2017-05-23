"use strict";

const osUtils  = require('os-utils');
const pusage = require('pidusage');

var CpuOS = function() {
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

var CpuProcess = function() {
    this.getStatus = function(request,callback) {
        pusage.stat(process.pid, function(err, stat) {
            if (err) {
                callback(err);
            } else {
                if (stat.cpu === undefined) {
                    callback('CPU status not found!');
                } else {
                    console.log(stat.cpu);
                    let cpuUsage = parseInt(stat.cpu)
                    let cpuFree = 100 - cpuUsage;

                    /* Unmonitor process */
                    pusage.unmonitor(process.pid);

                    callback(undefined,[
                        cpuUsage,
                        cpuFree
                    ]);
                }
            }
        });
    };
};

var cpuOS = new CpuOS();
var cpuProcess = new CpuProcess();

module.exports = {
    cpuOS: cpuOS,
    cpuProcess: cpuProcess
};