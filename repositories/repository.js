const low = require('lowdb');
const db = low('node_modules/hey-joe/data/db.json');
const properties  = require('../public/js/properties').config;
const moment = require('../public/js/moment');

/* Init values */
db.defaults({
    cpu: [],
    requests: [],
    disk: [],
    requestsPerHour: [],
    kbytesPerMinute: []
}).write();

var Repository = function() {};

Repository.prototype = {
    get: function(monitoringVariable,index,callback,changeValue) {
        var value = db.get(monitoringVariable + '[' + index + ']').value();
        if (value === undefined) {
            if (changeValue === undefined) {
                value = 0;
            } else {
                value = changeValue(0);
            }
        }
        callback(value);
    },
    getAll: function(monitoringVariable,callback,changeValue) {
        let self = this;
        let chartDataIndexes = properties.monitoringVariables[monitoringVariable].chartDataIndexes;
        let values = [];
        chartDataIndexes.forEach(function(index){
            self.get(monitoringVariable,index,function(value){
                values.push(value);
                if (values.length === chartDataIndexes.length) {
                    callback(values);
                }
            },changeValue);
        });
    },
    getStatus: function(monitoringVariable,data,callback) {
        db.get(monitoringVariable).unshift(data).write();
        if ( db.get(monitoringVariable).size().value() > properties.monitoringVariables[monitoringVariable].totalNumberMonitoring ) {
            db.get(monitoringVariable).pop().write();
        }
        this.getAll(monitoringVariable,function(values){
            callback(values);
        });
    }
};

function RepositoryRequests() {};

RepositoryRequests.prototype = {
    savePerHour: function(addsOneMore) {
        let requests = db.get('requestsPerHour[0]').value();
        let timestamp = moment().format('YYYY-MM-DD_HH');
        if ( (requests !== undefined) && (requests.timestamp === timestamp) ) {
            if (addsOneMore) {
                db.set('requestsPerHour[0].count', requests.count + 1).write();
            }
        } else {
            let newRequests = {
                timestamp: timestamp,
                count: 0
            };
            if (addsOneMore) {
                newRequests.count = 1;
            }
            db.get('requestsPerHour').unshift(newRequests).write();

            if ( db.get('requestsPerHour').size().value() > properties.monitoringVariables.requestsPerHour.totalNumberMonitoring ) {
                db.get('requestsPerHour').pop().write();
            }
        }
    },
    getStatusPerHour(callback) {
        this.getAll('requestsPerHour',function(values){
            callback(values);
        },function(value){
            return { count: value };
        });
    },
    saveKbytesPerMinute: function(kbytes) {
        let data = db.get('kbytesPerMinute[0]').value();
        let timestamp = moment().format('YYYY-MM-DD_HH:mm');
        if ( (data !== undefined) && (data.timestamp === timestamp) ) {
            db.set('kbytesPerMinute[0].total', data.total + kbytes).write();
        } else {
            let newData = {
                timestamp: timestamp,
                total: kbytes
            }
            db.get('kbytesPerMinute').unshift(newData).write();
            if ( db.get('kbytesPerMinute').size().value() > properties.monitoringVariables.kbytesPerMinute.totalNumberMonitoring ) {
                db.get('kbytesPerMinute').pop().write();
            }
        }
    },
    getKbytesPerMinute(callback) {
        this.getAll('kbytesPerMinute',function(values){
            callback(values);
        },function(value){
            return { total: value };
        });
    }
};
properties.extend(Repository, RepositoryRequests);

module.exports = {
    Repository: Repository,
    RepositoryRequests: RepositoryRequests
};