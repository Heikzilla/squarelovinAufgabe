var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var api = require('./api');

var request = require('request');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/results_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        search:req.query.name
    };
    console.log(response);

    var resultTable = api.apiresponse(JSON.stringify(response));

    if(resultTable != ''){
        res.send(resultTable);
    }

})

//Run Server
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:%s", port);
})