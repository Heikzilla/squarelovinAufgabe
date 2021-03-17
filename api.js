
var request = require('request');
require('dotenv').config();
var table
var search

exports.apiresponse = function(search){
    var lookInside = JSON.parse(search);
    if(search != ''){
       var getString = '?name=' + lookInside.search;
    }else{
        getString = ''; 
    };
    request('https://' + process.env.MOCK_API_KEY + '.mockapi.io/publisher' + getString, function(error, response, body){
    
        if(response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            console.log('Count Objects: ' +  Object.keys(bodyObj).length);
            //build Table
            table += "<table border='1'>";
            for(var i = 0; i < Object.keys(bodyObj).length; i++){
                table += "<tr><td>" + (i+1) + ': ' + bodyObj[i].name + "</td><td>" + (i+1) + ': ' + bodyObj[i].createdAt + "</td></tr>";
            };
            table += "</table>";
            
        }
        
    });
    return table;
}

exports.apisearch = function(search){
    var lookInside = JSON.parse(search);
    console.log('?name=' + lookInside.search);
    // request('https://' + process.env.MOCK_API_KEY + '.mockapi.io/publisher', function(error, response, body){
        
    //         if(response.statusCode === 200) {
    //             var bodyObj = JSON.parse(body);
                
    //             console.log('Count Objects: ' +  Object.keys(bodyObj).length);
    //             for(var i = 0; i < Object.keys(bodyObj).length; i++){
    //                 console.log((i+1) + ': ' + bodyObj[i].name);
    //             };
    //         }else{
    //             console.log('statusCode: ', response && response.statusCode);
    //             console.log('error: ', error);
    //         }
        
    // });

}
