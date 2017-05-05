(function(exports){

    const API_VERSION = 0;

    exports.config = {
        defaultTimeout: 5000,
        errorMessage: 'Could not get the value of this monitoring variable!',
        apiVersion: API_VERSION,
        monitoringVariables: {
            cpu: {
                id: "cpuCore",
                url: "api/" + API_VERSION + "/cpu",
                label: "CPU Usage",
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
                millisecondsUpdateTime: 5000,
                totalNumberMonitoring: 600,
                chart: undefined,
                chartType: 'pie'
            },
            concurrentUsers: {
                url: "api/" + API_VERSION + "/concurrent-users",
                label: "Concurrent Users",
                status: function(value) {
                    if (value < 1000) return "stable";
                    else if (value < 2000) return "unstable";
                    else return "dangerous";
                },
                chartLabels: ['h -3','h -2','h -1','now'],
                chartDataIndexes: [180,120,60,0],
                millisecondsUpdateTime: 60000,
                totalNumberMonitoring: 1440
            }
        }
    };

})(typeof exports === 'undefined'? this['properties']={}: exports);