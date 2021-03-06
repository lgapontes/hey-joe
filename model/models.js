"use strict";

const path = require('path');
const properties  = require('../public/js/properties').config;
const Repository  = require('../repositories/repository').Repository;
const RepositoryRequests  = require('../repositories/repository').RepositoryRequests;
const repository = new Repository();
const repositoryRequests = new RepositoryRequests();

/* Infrastructure */
var infrastructure = {
    cpuOS: require('../infrastructure/cpu').cpuOS,
    cpuProcess: require('../infrastructure/cpu').cpuProcess,
    requests: require('../infrastructure/requests').requests,
    disk: require('../infrastructure/disk').disk,
    uptimeOS: require('../infrastructure/uptime').uptimeOS,
    uptimeProcess: require('../infrastructure/uptime').uptimeProcess,
    residentSetSize: require('../infrastructure/memory').residentSetSize,
    heap: require('../infrastructure/memory').heap,
    processMemory: require('../infrastructure/memory').processMemory
};

/* Super Class */
function BasicModel(_monitoringVariable) {
    this.monitoringVariable = _monitoringVariable;
};

BasicModel.prototype = {
    getStatus: function (request,callback) {
        var monitoringVariable = this.monitoringVariable;
        infrastructure[monitoringVariable].getStatus(request,function(error,data){
            if (error) {
                callback(error);
            } else {
                repository.getStatus(monitoringVariable,data,function(values){
                   callback(undefined,values);
                });
            }
        });
    }
};

/* Models */
var CpuOS = function() {
    BasicModel.call(this, "cpuOS");
};
properties.extend(BasicModel, CpuOS);

var CpuProcess = function() {
    BasicModel.call(this, "cpuProcess");
};
properties.extend(BasicModel, CpuProcess);

var Requests = function() {
    BasicModel.call(this, "requests");
};
Requests.prototype = {
    savePerHour: function(addsOneMore) {
      repositoryRequests.savePerHour(addsOneMore);
    },
    getStatusPerHour: function(callback) {
        repositoryRequests.getStatusPerHour(function(values){
          callback(undefined,values);
        });
    },
    countKbytes: function(bytes) {
      var kbytes = bytes / 1024;
      if (kbytes !== undefined) {
          repositoryRequests.saveKbytesPerMinute(kbytes);
      }
    },
    getKbytesPerMinute: function(callback) {
      repositoryRequests.getKbytesPerMinute(function(values){
        callback(undefined,values);
      });
    },
    markStart: function(request) {
      request.start = Date.now();
    },
    calcRequestTime: function(request) {
      let time = Date.now() - request.start;
      repositoryRequests.saveRequestsMeanTime(time);
    },
    getRequestsMeanTime: function(callback) {
      repositoryRequests.getRequestsMeanTime(function(values){
        callback(undefined,values);
      });
    }
};
properties.extend(BasicModel, Requests);

var Disk = function() {
    BasicModel.call(this, "disk");
};
properties.extend(BasicModel, Disk);

var UptimeOS = function() {
    BasicModel.call(this, "uptimeOS");
};
properties.extend(BasicModel, UptimeOS);

var UptimeProcess = function() {
    BasicModel.call(this, "uptimeProcess");
};
properties.extend(BasicModel, UptimeProcess);

var ResidentSetSize = function() {
    BasicModel.call(this, "residentSetSize");
};
properties.extend(BasicModel, ResidentSetSize);

var Heap = function() {
    BasicModel.call(this, "heap");
};
properties.extend(BasicModel, Heap);

var ProcessMemory = function() {
    BasicModel.call(this, "processMemory");
};
properties.extend(BasicModel, ProcessMemory);

module.exports = {
    CpuOS: CpuOS,
    CpuProcess: CpuProcess,
    Requests: Requests,
    Disk: Disk,
    UptimeOS: UptimeOS,
    UptimeProcess: UptimeProcess,
    ResidentSetSize: ResidentSetSize,
    Heap: Heap,
    ProcessMemory: ProcessMemory
};