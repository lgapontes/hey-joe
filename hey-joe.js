const express = require('express');
const router = express.Router();
const osUtils  = require('os-utils');
const Server = require('./lib/server').Server;
const properties  = require('./public/js/properties').config;
const CPU  = require('./model/models').CPU;
const server = new Server();

/* Models */
var cpu = new CPU();

/* Static files of Hey-Joe */
router.use(express.static('public'));


/* Index */
router.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

/* API */
router.get('/api/' + properties.apiVersion + "/cpu", function(req,res) {
    server.getCpuStatus(function(status){
        cpu.save(status,function(values){
            res.json(values);
        });
    });
});

module.exports = router;