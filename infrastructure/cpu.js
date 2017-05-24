"use strict";

const osUtils  = require('os-utils');
const pusage = require('pidusage');
const windowsCpu = require('windows-cpu');
const os = require('os');

var CpuOS = function() {
    this.getStatus = function(request,callback) {
        osUtils.cpuUsage(function(value){
            var cpuUsage = parseInt(value * 100);
            var cpuFree = 100 - cpuUsage;

            if (cpuUsage > 100) {
                cpuUsage = 100;
                cpuFree = 0;
            }

            callback(undefined,[
                cpuUsage,
                cpuFree
            ]);
        });
    };
};

var CpuProcess = function() {
    this.getStatus = function(request,callback) {

        if (os.platform() === 'win32') {
            windowsCpu.nodeLoad(function(error, results) {
                if(error) {
                    callback(error);
                }
                    if (results === undefined) {
                        callback('CPU status not found!');
                    } else {
                        let cpuUsage = parseInt(results.load);
                        let cpuFree = 100 - cpuUsage;

                        if (cpuUsage > 100) {
                            cpuUsage = 100;
                            cpuFree = 0;
                        }

                        callback(undefined,[
                            cpuUsage,
                            cpuFree
                        ]);
                    }
            });
        } else {
            pusage.stat(process.pid, function(err, stat) {
                if (err) {
                    callback(err);
                } else {
                    if (stat.cpu === undefined) {
                        callback('CPU status not found!');
                    } else {
                        let cpuUsage = parseInt(stat.cpu)
                        let cpuFree = 100 - cpuUsage;

                        if (cpuUsage > 100) {
                            cpuUsage = 100;
                            cpuFree = 0;
                        }

                        /* Unmonitor process */
                        pusage.unmonitor(process.pid);

                        callback(undefined,[
                            cpuUsage,
                            cpuFree
                        ]);
                    }
                }
            });
        }
    };
};

var cpuOS = new CpuOS();
var cpuProcess = new CpuProcess();

module.exports = {
    cpuOS: cpuOS,
    cpuProcess: cpuProcess
};