const util  = require('util');

var ResidentSetSize = function() {
    this.getStatus = function(request,callback) {
        let mb = parseInt( (process.memoryUsage().rss / 1024) / 1024 );
        callback(undefined,mb);
    };
};

var residentSetSize = new ResidentSetSize();

module.exports = {
    residentSetSize: residentSetSize
};