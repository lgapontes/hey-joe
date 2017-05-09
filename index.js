const express = require('express');
const app = express();
const router = express.Router();
const osUtils  = require('os-utils');
const cors = require('cors');
const Server = require('./lib/server').Server;
const properties  = require('./public/js/properties').config;
const CPU  = require('./model/models').CPU;
const Request  = require('./model/models').Request;
const Disk  = require('./model/models').Disk;
const server = new Server();

var statusMonitoringMethods = undefined;

/* Models */
var cpu = new CPU();
var request = new Request();
var disk = new Disk();

/* Static files of Hey-Joe */
router.use(cors());
//router.use(express.static('public'));
router.use(express.static(__dirname + '/public'));

/* Index */
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

/* API */
router.get('/api/' + properties.apiVersion + "/status-monitoring-methods", function(req,res) {
    res.json(statusMonitoringMethods);
});

router.get('/api/' + properties.apiVersion + "/cpu", function(req,res) {
    server.getCpuStatus(function(status){
        cpu.save(status,function(values){
            res.json(values);
        });
    });
});

router.get('/api/' + properties.apiVersion + "/requests", function(req,res) {
    server.getConcurrentRequests(req,function(error,count){
        if (error) {
            res.status(500);
        } else {
            request.logAccess(count,function(values){
                res.json(values);
            });
        }
    });
});

router.get('/api/' + properties.apiVersion + "/disk", function(req,res) {
    server.getDiskUsage(function(error,data){
        if (error) {
            res.status(500);
        } else {
            disk.save(data,function(values){
                res.json(values);
            });
        }
    });
});

module.exports = function(param){
    statusMonitoringMethods = param;
    return router;
}