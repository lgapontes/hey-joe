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
    disk: require('../infrastructure/disk').disk
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
    countFileKbytes: function(path) {
      infrastructure.requests.getFileSize(path,function(error,kbytes){
        if (error === undefined) {
          repositoryRequests.saveKbytesPerMinute(kbytes);
        }
      });
    },
    countStringKbytes: function(str) {
      infrastructure.requests.getStringSize(str,function(error,kbytes){
        if (error === undefined) {
          repositoryRequests.saveKbytesPerMinute(kbytes);
        }
      });
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

module.exports = {
    CpuOS: CpuOS,
    CpuProcess: CpuProcess,
    Requests: Requests,
    Disk: Disk
};