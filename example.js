const express = require('express');
const app = express();

/* Example of use */
app.use('/hey-joe',require('./hey-joe')({
    cpu: {
        stable: 57,
        unstable: 60
    },
    requests: {
        stable: 3,
        unstable: 5
    }
}));

app.get('/',function(req,res){
    res.send('ok');
});

app.listen(8888, function () {
    console.log('Example of Hey-Joe running!');
});