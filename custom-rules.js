var customRules = {
    monitoringVariables: {
        cpuOS: {
            status: function(value) {
                if (value < 70) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        cpuProcess: {
            status: function(value) {
                if (value < 50) return "stable";
                else if (value < 70) return "unstable";
                else return "dangerous";
            }
        },
        requestsMeanTime: {
            status: function(value) {
                if (value < 5000) return "stable";
                else if (value < 10000) return "unstable";
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
        kbytesPerMinute: {
            status: function(value) {
                if (value < 10240) return "stable";
                else if (value < 102400) return "unstable";
                else return "dangerous";
            }
        },
        disk: {
            status: function(value) {
                if (value < 80) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        uptimeOS: {
            status: function(value) {
                /*
                    In this case, value is a JSON with values of the uptime period, as shown below:
                    {
                        years: integer,
                        months: integer,
                        days: integer,
                        hours: integer,
                        minutes: integer,
                        seconds: integer
                    }
                */
                return "stable";
            }
        },
        uptimeProcess: {
            status: function(value) {
                /*
                    In this case, value is a JSON with values of the uptime period, as shown below:
                    {
                        years: integer,
                        months: integer,
                        days: integer,
                        hours: integer,
                        minutes: integer,
                        seconds: integer
                    }
                */
                return "stable";
            }
        },
        residentSetSize: {
            status: function(value) {
                return "stable";
            }
        }
    }
};