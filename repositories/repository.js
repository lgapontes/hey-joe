const low = require('lowdb');
const db = low('node_modules/hey-joe/data/db.json');
const properties  = require('../public/js/properties').config;

/* Init values */
db.defaults({
    cpu: [],
    requests: [],
    disk: []
}).write();

var Repository = function() {

    var get = function(monitoringVariable,index,callback) {
        var value = db.get(monitoringVariable + '[' + index + ']').value();
        if (value === undefined) value = 0;
        callback(value);
    };

    var getAll = function(monitoringVariable,callback) {
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

    this.getStatus = function(monitoringVariable,data,callback) {
        db.get(monitoringVariable).unshift(data).write();
        if ( db.get(monitoringVariable).size().value() > properties.monitoringVariables[monitoringVariable].totalNumberMonitoring ) {
            db.get(monitoringVariable).pop().write();
        }
        getAll(monitoringVariable,function(values){
            callback(values);
        });
    };

};

module.exports = {
    Repository: Repository
};