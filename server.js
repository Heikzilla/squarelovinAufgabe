const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const api = require('./api');
const data = require('./data');

const request = require('request');

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/results_get', function (req, resp) {
    // Prepare output in JSON format
    let query = {
        search: req.query.name
    };
    console.log(query);

    let res = api.apiPublisher(JSON.stringify(query));
    res.then(function(values) {
        let table = "<table border='1'>";
        table +="<tr><td>id</td><td>name</td><td>createdAt</td></tr>";
        for(var i = 0; i < values.length; i++){
            table += values[i].toTableElem();
        };
        table += "</table>";
        resp.send(table);     
    },function(e) {
        resp.send("ERROR: " + e);
    });
})

app.get('/publisher', function (req, resp) {
    // Prepare output in JSON format
    let query = req.query.id;
    console.log(query);

    let res = api.getPublisherById(query);
    res.then(function(value) {
        console.log(value);
        let table = "<table border='1'>";
        table +="<tr><td>id</td><td>name</td><td>createdAt</td></tr>";
        table += value.toTableElem();
        table += "</table>";
        resp.send(table);     
    }, function(e) {
        resp.send("ERROR: " + e);
    });
})

//Run Server
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:%s", port);
})