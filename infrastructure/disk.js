const disk = require('diskusage');
const os = require('os');

let mainDisk = '/boot';

var Disk = function() {
    this.getStatus = function(request,callback) {
        let path = os.platform() === 'win32' ? 'c:' : '/';
        if (mainDisk !== undefined) path = mainDisk;
        disk.check(path, function(error, info) {
            if (error) {
                callback(error);
            } else {
                let bytesUsed = info.total - info.free;
                let used = parseInt( (bytesUsed * 100) / info.total );
                let free = 100 - used;
                callback(undefined,[
                    [used],
                    [free]
                ]);
            }
        });
    };
};

var obj = new Disk();

module.exports = {
    disk: obj
};