//This module help to listen request
var express = require('express');
var app = express();
var task = '';
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();

app.get('/', function (req, res) {
//To specify what to do and run that function.
    task = req.query.task;
    if(task == "getProducts"){
        getProducts(res);
    }
    if(task == "getProductOrderBook"){
        getProductOrderBook(res);
    }
});

//Get exchangeable Product details
function getProducts(res){
    publicClient.getProducts().then(data => {
	    // work with data
	    res.contentType('application/json');
    	res.end(JSON.stringify(data));
	}).catch(error => {
	    // handle the error
	    console.log(error);
  });   
}
//Get exchangeable Product Order Book details
function getProductOrderBook(res){
    publicClient.getProductOrderBook('BTC-USD', { level: 3 }).then(book => {
    	res.contentType('application/json');
    	res.end(JSON.stringify(book));
	});
}

if (module === require.main) {
    // Start the server
    var server = app.listen(process.env.PORT || 8085, function () {
        var port = server.address().port;
        console.log('App listening on port %s', port);
    });
}
module.exports = app;