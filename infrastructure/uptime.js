"use strict";

const os = require('os');

function secondsToJson(seconds,callback) {
    let numyears = Math.floor(seconds / 31536000);
    let nummonths = Math.floor((seconds % 31536000) / 2592000);
    let numdays = Math.floor((seconds % 31536000) / 86400);
    let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    callback({
        years: numyears,
        months: nummonths,
        days: numdays,
        hours: numhours,
        minutes: numminutes,
        seconds: numseconds
    });
    return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

var UptimeOS = function() {
    this.getStatus = function(request,callback) {
        let seconds = Math.floor(os.uptime());
        secondsToJson(seconds,function(json){
            callback(undefined,json);
        });
    };
};

var UptimeProcess = function() {
    this.getStatus = function(request,callback) {
        let seconds = Math.floor(process.uptime());
        secondsToJson(seconds,function(json){
            callback(undefined,json);
        });
    };
};

var uptimeOS = new UptimeOS();
var uptimeProcess = new UptimeProcess();

module.exports = {
    uptimeOS: uptimeOS,
    uptimeProcess: uptimeProcess
};