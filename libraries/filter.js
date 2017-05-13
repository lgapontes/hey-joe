const Requests  = require('../model/models').Requests;
var requests = new Requests();

let filter = {};

filter.all = function all(res,callback) {

    let originalDownload = res.download;
    let originalEnd = res.end;
    let originalJson = res.json;
    let originalJsonp = res.jsonp;
    let originalRender = res.render;
    let originalSend = res.send;
    let originalSendFile = res.sendFile;

    res.download = function(path) {
        requests.countFileKbytes(path);
        originalDownload.call(this,path);
    };
    res.download = function(path, filename) {
        requests.countFileKbytes(path);
        originalDownload.call(this,path, filename);
    };
    res.download = function(path, filename, fn) {
        requests.countFileKbytes(path);
        originalDownload.call(this,path, filename, fn);
    };

    res.end = function() {
        originalEnd.call(this);
    };
    res.end = function(data) {
        requests.countStringKbytes(data);
        originalEnd.call(this,data);
    };
    res.end = function(data, encoding) {
        requests.countStringKbytes(data);
        originalEnd.call(this,data, encoding);
    };

    res.json = function() {
        originalJson.call(this);
    };
    res.json = function(body) {
        requests.countStringKbytes(body);
        originalJson.call(this,body);
    };

    res.jsonp = function() {
        originalJsonp.call(this);
    };
    res.jsonp = function(body) {
        requests.countStringKbytes(body);
        originalJsonp.call(this,body);
    };

    res.send = function() {
        originalSend.call(this);
    };
    res.send = function(body) {
        requests.countStringKbytes(body);
        originalSend.call(this,body);
    };

    /* In this case, app use "send" method */
    res.render = function(view) {
        originalRender.call(this,view,function(err, html){
            res.send(html);
        });
    };
    res.render = function(view, callback) {
        originalRender.call(this,view, callback);
    };
    res.render = function(view, locals, callback) {
        originalRender.call(this,view, locals, callback);
    };

    res.sendFile = function(path) {
        requests.countFileKbytes(path);
        originalSendFile.call(this, path);
    };
    res.sendFile = function(path, options) {
        requests.countFileKbytes(path);
        originalSendFile.call(this, path, options);
    };
    res.sendFile = function(path, options, fn) {
        requests.countFileKbytes(path);
        originalSendFile.call(this, path, options, fn);
    };

    callback(res);
};

module.exports = filter;