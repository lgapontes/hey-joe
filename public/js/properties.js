(function(exports){

    const API_VERSION = 0;

    exports.config = {
        currentStatus: 'loading',
        defaultTimeout: 3000,
        errorMessage: 'Could not get this monitoring variable!',
        millisecondsUpdateTime: 10000,
        apiVersion: API_VERSION,
        monitoringVariables: {
            cpuOS: {
                id: "cpuOS",
                url: "api/" + API_VERSION + "/cpu/os",
                label: "CPU (Operating System)",
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
                totalNumberMonitoring: 360,
                chart: undefined,
                chartType: 'pie'
            },
            cpuProcess: {
                id: "cpuProcess",
                url: "api/" + API_VERSION + "/cpu/process",
                label: "CPU (NodeJS Process)",
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
                totalNumberMonitoring: 360,
                chart: undefined,
                chartType: 'pie'
            },
            requestsMeanTime: {
                id: "requestsMeanTime",
                url: "api/" + API_VERSION + "/requests/mean-time",
                label: "HTTP Requests Mean Time",
                currentStatus: 'loading',
                chartLabels: ['Min', 'Mean', 'Top'],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return [
                        json[0].minTime,
                        json[0].meanTime,
                        json[0].topTime
                    ];
                },
                value: function(values){
                    return values[1];
                },
                formatedValue: function(values){
                    return values[1] + ' ms';
                },
                totalNumberMonitoring: 1,
                chart: undefined,
                chartType: '3bar'
            },
            requests: {
                id: "requests",
                url: "api/" + API_VERSION + "/requests",
                label: "Concurrent Requests",
                currentStatus: 'loading',
                chartLabels: ['-30s','-20s','-10s','now'],
                chartDataIndexes: [3,2,1,0],
                getDataAppropriately: function(json) {
                    return [ json ];
                },
                value: function(values){
                    return values[0][3];
                },
                formatedValue: function(values){
                    return values[0][3];
                },
                totalNumberMonitoring: 360,
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
                totalNumberMonitoring: 360,
                chart: undefined,
                chartType: 'hbar'
            },
            uptimeOS: {
                id: "uptimeOS",
                url: "api/" + API_VERSION + "/uptime/os",
                label: "Operating System Uptime",
                currentStatus: 'loading',
                chartLabels: ['years','months','days','hours'],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return [
                        json[0].years,
                        json[0].months,
                        json[0].days,
                        json[0].hours,
                        json[0].minutes,
                        json[0].seconds
                    ];
                },
                value: function(values){
                    return {
                        years: values[0],
                        months: values[1],
                        days: values[2],
                        hours: values[3],
                        minutes: values[4],
                        seconds: values[5]
                    };
                },
                formatedValue: function(values){
                    function round(v) {
                        return Math.round( v * 10 ) / 10;
                    }
                    var minutes = round((values[5] / 60) + values[4]);
                    var hours = round((minutes / 60) + values[3]);
                    var days = round((hours / 24) + values[2]);
                    var months = round((days / 30) + values[1]);
                    var years = round((months / 12) + values[0]);
                    if (years > 0) return years + ' years';
                    if (months > 0) return months + ' months';
                    if (days > 0) return days + ' days';
                    return hours + ' hours';
                },
                totalNumberMonitoring: 1,
                chart: undefined,
                chartType: 'uptime'
            },
            uptimeProcess: {
                id: "uptimeProcess",
                url: "api/" + API_VERSION + "/uptime/process",
                label: "NodeJS Uptime",
                currentStatus: 'loading',
                chartLabels: ['years','months','days','hours'],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return [
                        json[0].years,
                        json[0].months,
                        json[0].days,
                        json[0].hours,
                        json[0].minutes,
                        json[0].seconds
                    ];
                },
                value: function(values){
                    return {
                        years: values[0],
                        months: values[1],
                        days: values[2],
                        hours: values[3],
                        minutes: values[4],
                        seconds: values[5]
                    };
                },
                formatedValue: function(values){
                    function round(v) {
                        return Math.round( v * 10 ) / 10;
                    }
                    var minutes = round((values[5] / 60) + values[4]);
                    var hours = round((minutes / 60) + values[3]);
                    var days = round((hours / 24) + values[2]);
                    var months = round((days / 30) + values[1]);
                    var years = round((months / 12) + values[0]);
                    if (years > 0) return years + ' years';
                    if (months > 0) return months + ' months';
                    if (days > 0) return days + ' days';
                    return hours + ' hours';
                },
                totalNumberMonitoring: 1,
                chart: undefined,
                chartType: 'uptime'
            },
            residentSetSize: {
                id: "residentSetSize",
                url: "api/" + API_VERSION + "/memory/rss",
                label: "Resident Set Size",
                currentStatus: 'loading',
                chartLabels: ['-30s','-20s','-10s','now'],
                chartDataIndexes: [3,2,1,0],
                getDataAppropriately: function(json) {
                    return [ json ];
                },
                value: function(values){
                    return values[0][3];
                },
                formatedValue: function(values){
                    return values[0][3] + ' MB';
                },
                totalNumberMonitoring: 60,
                chart: undefined,
                chartType: 'line'
            },
            heap: {
                id: "heap",
                url: "api/" + API_VERSION + "/memory/heap",
                label: "Heap Used",
                currentStatus: 'loading',
                chartLabels: ['-20s','-10s','now'],
                chartDataIndexes: [2,1,0],
                getDataAppropriately: function(json) {
                    return [
                        [json[0].used, json[1].used, json[2].used],
                        [json[0].total, json[1].total, json[2].total],
                    ];
                },
                value: function(values){
                    return values;
                },
                formatedValue: function(values){
                    return values[0][2] + " MB";
                },
                totalNumberMonitoring: 60,
                chart: undefined,
                chartType: 'heap'
            },
            processMemory: {
                id: "processMemory",
                url: "api/" + API_VERSION + "/memory/process",
                label: "Used Memory (NodeJS)",
                currentStatus: 'loading',
                chartLabels: [],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return json[0];
                },
                value: function(values){
                    return {
                        used: values[0][0],
                        total: values[1][0],
                    };
                },
                formatedValue: function(values){
                    return values[0][0] + " MB";
                },
                totalNumberMonitoring: 1,
                chart: undefined,
                chartType: 'hbar2'
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