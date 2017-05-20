const pusage = require('pidusage');
const os = require('os');

function round(v) {
    return Math.round( v * 10 ) / 10;
}

var ResidentSetSize = function() {
    this.getStatus = function(request,callback) {
        let mb = parseInt( (process.memoryUsage().rss / 1024) / 1024 );
        callback(undefined,mb);
    };
};

var Heap = function() {
    this.getStatus = function(request,callback) {
        let heap = {
            used: round( (process.memoryUsage().heapUsed / 1024) / 1024 ),
            total: round( (process.memoryUsage().heapTotal / 1024) / 1024 )
        };
        callback(undefined,heap);
    };
};

var ProcessMemory = function() {
    this.getStatus = function(request,callback) {
        pusage.stat(process.pid, function(err, stat) {
            if (err) {
                callback(err);
            } else {
                if (stat.memory === undefined) {
                    callback('Memory status not found!');
                } else {
                    let memoryUsed = round( (stat.memory / 1024) / 1024 );
                    let memoryTotal = round( (os.totalmem() / 1024) / 1024 );

                    /* Unmonitor process */
                    pusage.unmonitor(process.pid);

                    callback(undefined,[
                        [memoryUsed],
                        [memoryTotal]
                    ]);
                }
            }
        });
    };
};

var residentSetSize = new ResidentSetSize();
var heap = new Heap();
var processMemory = new ProcessMemory();

module.exports = {
    residentSetSize: residentSetSize,
    heap: heap,
    processMemory: processMemory
};