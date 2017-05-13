(function(exports){

    const API_VERSION = 0;

    exports.config = {
        currentStatus: 'loading',
        defaultTimeout: 3000,
        errorMessage: 'Could not get this monitoring variable!',
        millisecondsUpdateTime: 5000,
        apiVersion: API_VERSION,
        monitoringVariables: {
            cpu: {
                id: "cpu",
                url: "api/" + API_VERSION + "/cpu",
                label: "CPU Usage",
                currentStatus: 'loading',
                chartLabels: [],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return json[0];
                },
                value: function(values){
                    return values[0];
                },
                formatedValue: function(values){
                    return values[0] + "%";
                },
                totalNumberMonitoring: 600,
                chart: undefined,
                chartType: 'pie'
            },
            requests: {
                id: "requests",
                url: "api/" + API_VERSION + "/requests",
                label: "Concurrent Requests",
                currentStatus: 'loading',
                chartLabels: ['-15s','-10s','-5s','now'],
                chartDataIndexes: [180,120,60,0],
                getDataAppropriately: function(json) {
                    return [ json ];
                },
                value: function(values){
                    return values[0][3];
                },
                formatedValue: function(values){
                    return values[0][3];
                },
                totalNumberMonitoring: 720,
                chart: undefined,
                chartType: 'line'
            },
            requestsPerHour: {
                id: "requestsPerHour",
                url: "api/" + API_VERSION + "/requests/hour",
                label: "Total Requests per Hour",
                currentStatus: 'loading',
                chartLabels: ['-2h','-1h','now'],
                chartDataIndexes: [2,1,0],
                getDataAppropriately: function(json) {
                    return [[
                        json[0].count,
                        json[1].count,
                        json[2].count
                    ]];
                },
                value: function(values){
                    return values[0][2];
                },
                formatedValue: function(values){
                    return values[0][2];
                },
                totalNumberMonitoring: 24,
                chart: undefined,
                chartType: 'line'
            },
            kbytesPerMinute: {
                id: "kbytesPerMinute",
                url: "api/" + API_VERSION + "/kbytes/minute",
                label: "Download Kbytes per Minute",
                currentStatus: 'loading',
                chartLabels: ['-3m','-2m','-1m','now'],
                chartDataIndexes: [3,2,1,0],
                getDataAppropriately: function(json) {
                    return [[
                        parseFloat(json[0].total).toFixed(2),
                        parseFloat(json[1].total).toFixed(2),
                        parseFloat(json[2].total).toFixed(2),
                        parseFloat(json[3].total).toFixed(2)
                    ]];
                },
                value: function(values){
                    return values[0][3];
                },
                formatedValue: function(values){
                    return values[0][3] + ' KB';
                },
                totalNumberMonitoring: 60,
                chart: undefined,
                chartType: 'line'
            },
            disk: {
                id: "disk",
                url: "api/" + API_VERSION + "/disk",
                label: "Disk Usage",
                currentStatus: 'loading',
                chartLabels: [],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return json[0];
                },
                value: function(values){
                    return values[0][0];
                },
                formatedValue: function(values){
                    return values[0][0] + "%";
                },
                totalNumberMonitoring: 720,
                chart: undefined,
                chartType: 'hbar'
            }
        },
        getAllProperties: function(object) {
             var properties = [];
             for(var key in object) {
                  properties.push(key);
             }
             return properties;
        },
        extend: function(base, sub) {
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
        }
    };

})(typeof exports === 'undefined'? this['properties']={}: exports);