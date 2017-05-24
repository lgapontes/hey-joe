"use strict";

const Requests  = require('../model/models').Requests;
var requests = new Requests();

let filter = {};

filter.all = function all(req,res,callback) {
    requests.markStart(req);

    res.once('finish', function() {
        let bytes = res._headers['content-length'] | 0;
        requests.countKbytes(bytes);
        requests.calcRequestTime(req);
    });

    callback(res);
};

module.exports = filter;