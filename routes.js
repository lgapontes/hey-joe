const express = require('express');
const app = express();
const router = express.Router();
const properties  = require('./public/js/properties').config;
const CpuOS  = require('./model/models').CpuOS;
const CpuProcess  = require('./model/models').CpuProcess;
const Requests  = require('./model/models').Requests;
const Disk  = require('./model/models').Disk;

/* Models */
let cpuOS = new CpuOS();
let cpuProcess = new CpuProcess();
let requests = new Requests();
let disk = new Disk();

/* Static files of Hey-Joe */
router.use(express.static(__dirname + '/public'));

/* Index */
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
router.get('/js/custom-rules.js', function (req, res) {
  res.sendFile(__dirname + '/custom-rules.js');
});

router.get('/api/' + properties.apiVersion + "/cpu/os", function(req,res) {
    cpuOS.getStatus(req,function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

router.get('/api/' + properties.apiVersion + "/cpu/process", function(req,res) {
    cpuProcess.getStatus(req,function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

router.get('/api/' + properties.apiVersion + "/requests/mean-time", function(req,res) {
    requests.getRequestsMeanTime(function(error,status){
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

router.get('/api/' + properties.apiVersion + "/requests/hour", function(req,res) {
    requests.getStatusPerHour(function(error,status){
        if (error) {
            res.status(500);
        } else {
            res.json(status);
        }
    });
});

router.get('/api/' + properties.apiVersion + "/kbytes/minute", function(req,res) {
    requests.getKbytesPerMinute(function(error,status){
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

module.exports = router;