var express = require('express');
var services = require('./app/data-layer');

var port = process.env.PORT || 5000;
var app = express();
app.use(function (req, res, next) {

	console.log('%s - %s', req.method, req.url);
	next();
	
});

app.use(express.static(__dirname + '/public'));

app.use(services);

app.listen(port, function() {
	console.log("Server listening on %d...", port);
});
