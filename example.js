const express = require('express');
var app = express();
app.use(express.static('public'));

/* Example of use */
app.use(require('./hey-joe.js'));

app.listen(8888, function () {
    console.log('Example of Hey-Joe running!');
});