var customRules = {
    monitoringVariables: {
        cpu: {
            status: function(value) {
                if (value < 70) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        requests: {
            status: function(value) {
                if (value < 1000) return "stable";
                else if (value < 3000) return "unstable";
                else return "dangerous";
            }
        },
        requestsPerHour: {
            status: function(value) {
                if (value < 60000) return "stable";
                else if (value < 180000) return "unstable";
                else return "dangerous";
            }
        },
        disk: {
            status: function(value) {
                if (value < 80) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        }
    }
};