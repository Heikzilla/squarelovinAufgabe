const request = require('request');
require('dotenv').config();

const data = require('./data');

function getJSONObj(urlPath) {
    let url = 'http://' + process.env.MOCK_API_KEY + '.mockapi.io/' + urlPath;

    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body){
            if(error) {
                reject("This strange thing is happening: " + error);
            } else if(response.statusCode === 200) {
                resolve(JSON.parse(body));
            } else {
                reject("Response Errorcode is " + response.statusCode);
            }
        });
    });
}

function getPublisherById(publisherId) {
    let prom = getJSONObj('/publisher/' + publisherId + '/');
    return prom.then(function(publisherData) {
        return data.Publisher.fromObject(publisherData);
    });
}

function apiPublisher(search) {
    let publisherName = JSON.parse(search).search;

    if(!publisherName){
        return Promise.reject("no publisher name");
    }

    let resArr = getJSONObj('/publisher?name=' + publisherName);
    return resArr.then(function(publisherArr){
        let ret = [];
        for(var i = 0; i < publisherArr.length; i++){
            ret.push(data.Publisher.fromObject(publisherArr[i]));
        };
        return ret;
    });
}



module.exports = {
    apiPublisher,
    getPublisherById
};