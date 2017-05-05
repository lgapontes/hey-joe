const low = require('lowdb');
const db = low('data/db.json');
const properties  = require('../public/js/properties').config;

/* Init values */
db.defaults({ cpu: [] }).write();

/* Utils */
function get(monitoringVariable,index,callback) {
    callback(db.get('cpu[' + index + ']').value());
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

module.exports = {
    CPU: CPU
};