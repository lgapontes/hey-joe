(function(exports){

    const API_VERSION = 0;

    exports.config = {
        currentStatus: 'loading',
        defaultTimeout: 3000,
        errorMessage: 'Could not get this monitoring variable!',
        millisecondsUpdateTime: 5000,
        apiVersion: API_VERSION,
        statusMonitoringMethodsUrl: "api/" + API_VERSION + '/status-monitoring-methods',
        monitoringVariables: {
            cpu: {
                id: "cpu",
                url: "api/" + API_VERSION + "/cpu",
                label: "CPU Usage",
                currentStatus: 'loading',
                status: function(value) {
                    if (value < 70) return "stable";
                    else if (value < 90) return "unstable";
                    else return "dangerous";
                },
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
                status: function(value) {
                    if (value < 1000) return "stable";
                    else if (value < 3000) return "unstable";
                    else return "dangerous";
                },
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
            disk: {
                id: "disk",
                url: "api/" + API_VERSION + "/disk",
                label: "Disk Usage",
                currentStatus: 'loading',
                status: function(value) {
                    if (value < 80) return "stable";
                    else if (value < 90) return "unstable";
                    else return "dangerous";
                },
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
                totalNumberMonitoring: 720,
                chart: undefined,
                chartType: 'hbar'
            }
        }
    };

})(typeof exports === 'undefined'? this['properties']={}: exports);