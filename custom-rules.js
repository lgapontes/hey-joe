var customRules = {
    monitoringVariables: {
        cpuOS: {
            status: function(value) {
                /* Value is a % of use */
                if (value < 70) return "stable";
                else if (value < 90) return "unstable";
                else return "dangerous";
            }
        },
        cpuProcess: {
            status: function(value) {
                /* Value is a % of use */
                if (value < 50) return "stable";
                else if (value < 70) return "unstable";
                else return "dangerous";
            }
        },
        requestsMeanTime: {
            status: function(value) {
                /* Brings the average request time in milliseconds */
                if (value < 5000) return "stable";
                else if (value < 10000) return "unstable";
                else return "dangerous";
            }
        },
        requests: {
            status: function(value) {
                /* Total of concurrent requests */
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
                /* Value is a % of use */
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
        },
        heap: {
            status: function(value) {
                /*
                    Value contains a table (array of arrays), where index 0 is associated with the value used and index 1 is the total value.
                    Within each, there is an array with the last 3 values obtained, with index 2 being the most recently obtained.
                    That is, value[0][2] stores the value of the heap used and value[1][2] stores its total.
                */
                var used = ( value[0][2] / value[1][2] );
                if ( used < 0.8 ) return "stable";
                else if ( used < 0.9 ) return "unstable";
                else return "dangerous";
            }
        },
        processMemory: {
           status: function(value) {
                /*
                    Value is a json that contains the memory used by NodeJS and the total memory of the operating system, as shown in the following example:
                    {
                        used: 50,
                        total: 8000
                    }
                */
                var percentage = value.used / value.total;
                if (percentage < 50) return "stable";
                else if (percentage < 70) return "unstable";
                else return "dangerous";
            }
        }
    }
};