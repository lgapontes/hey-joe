const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const Requests  = require('./model/models').Requests;
var requests = new Requests();

/* Cors */
router.use(cors());

/* Middleware of requests per hour */
router.use(function(req,res,next){
    requests.savePerHour((req.originalUrl.indexOf('hey-joe') == -1));
    next();
});

router.use('/hey-joe',require('./routes'));

module.exports = router;