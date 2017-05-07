const low = require('lowdb');
const db = low('node_modules/hey-joe/data/db.json');
const properties  = require('../public/js/properties').config;

/* Init values */
db.defaults({
    cpu: [],
    requests: []
}).write();

/* Utils */
function get(monitoringVariable,index,callback) {
    var value = db.get(monitoringVariable + '[' + index + ']').value();
    if (value === undefined) value = 0;
    callback(value);
};

function getAll(monitoringVariable,callback) {
    var chartDataIndexes = properties.monitoringVariables[monitoringVariable].chartDataIndexes;
    var values = [];
    chartDataIndexes.forEach(function(index){
        get(monitoringVariable,index,function(value){
            values.push(value);
            if (values.length === chartDataIndexes.length) {
                callback(values);
            }
        });
    });
};

var CPU = function() {
    this.save = function(status,callback) {
        db.get('cpu').unshift(status).write();
        if ( db.get('cpu').size().value() > properties.monitoringVariables.cpu.totalNumberMonitoring ) {
            db.get('cpu').pop().write();
        }
        getAll('cpu',function(values){
            callback(values);
        });
    }
};

var Request = function() {
    this.logAccess = function(data,callback) {
        db.get('requests').unshift(data).write();
        if ( db.get('requests').size().value() > properties.monitoringVariables.requests.totalNumberMonitoring ) {
            db.get('requests').pop().write();
        }
        getAll('requests',function(values){
            callback(values);
        });
    }
};

module.exports = {
    CPU: CPU,
    Request: Request
};