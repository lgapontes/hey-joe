const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const endMw = require('express-end');
const filter  = require('./libraries/filter');
const properties  = require('./public/js/properties').config;
const Requests  = require('./model/models').Requests;

var requests = new Requests();

/* Cors */
router.use(cors());

/* Express end event */
app.use(endMw);

/* Middleware features */
router.use(function(req,res,next){
    filter.all(req,res,function(newRes){
        res = newRes;

        /* Requests per hour */
        requests.savePerHour((req.originalUrl.indexOf('hey-joe') == -1));

        next();
    });
});

router.use('/hey-joe',require('./routes'));

module.exports = router;