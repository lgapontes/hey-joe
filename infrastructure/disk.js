"use strict";

const diskspace = require('diskspace');
const os = require('os');

let mainDisk = undefined;

var Disk = function() {
    this.getStatus = function(request,callback) {
        let path = os.platform() === 'win32' ? 'c:' : '/';
        if (mainDisk !== undefined) path = mainDisk;

        diskspace.check(path, function (error, result) {
            if (error) {
                callback(error);
            } else {
                let bytesUsed = result.used;
                let used = parseInt( (bytesUsed * 100) / result.total );
                let free = 100 - used;

                if (used > 100) {
                    used = 100;
                    free = 0;
                }

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