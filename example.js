const express = require('express');
const app = express();

/* Example of use */
app.use('/hey-joe',require('./hey-joe')({
    cpu: {
        stable: 20,
        unstable: 50
    }
}));

app.get('/',function(req,res){
    res.send('ok');
});

app.listen(8888, function () {
    console.log('Example of Hey-Joe running!');
});