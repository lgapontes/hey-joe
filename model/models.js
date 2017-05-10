const properties  = require('../public/js/properties').config;
const Repository  = require('../repositories/repository').Repository;
const repository = new Repository();

/* Infrastructure */
var infrastructure = {
    cpu: require('../infrastructure/cpu').cpu,
    requests: require('../infrastructure/requests').requests,
    disk: require('../infrastructure/disk').disk
};

/* Extend */
function extend(base, sub) {
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  sub.prototype.constructor = sub;
  Object.defineProperty(sub.prototype, 'constructor', {
    enumerable: false,
    value: sub
  });
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
var Cpu = function() {
    BasicModel.call(this, "cpu");
};
extend(BasicModel, Cpu);

var Requests = function() {
    BasicModel.call(this, "requests");
};
extend(BasicModel, Requests);

var Disk = function() {
    BasicModel.call(this, "disk");
};
extend(BasicModel, Disk);

module.exports = {
    Cpu: Cpu,
    Requests: Requests,
    Disk: Disk
};