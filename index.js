const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const properties  = require('./public/js/properties').config;
const Cpu  = require('./model/models').Cpu;
const Requests  = require('./model/models').Requests;
const Disk  = require('./model/models').Disk;

var statusMonitoringMethods = undefined;

/* Models */
var cpu = new Cpu();
var requests = new Requests();
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
    cpu.getStatus(req,function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

router.get('/api/' + properties.apiVersion + "/requests", function(req,res) {
    requests.getStatus(req,function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

router.get('/api/' + properties.apiVersion + "/disk", function(req,res) {
    disk.getStatus(req,function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

module.exports = function(param){
    statusMonitoringMethods = param;
    return router;
}