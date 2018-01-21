// 
var http = require('http');
var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser')
var logger = require('morgan');

var config = require('./config/config');

var app = express();

app.set('superSecret', config.secret);
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var PORT = process.env.PORT || 4001;

app.use('*', function (req, res, next) {
	res.status(404)
		.json({
			message: 'Geen enkele endpoint matcht!'
		})
		.end();
});

app.use(function (error, req, res, next) {
	console.error(error.toString());
	res.status(500).json({
		message: error
	}).end();
});

app.listen(PORT, function(){
	console.log('De server luistert op port: ');	
});

module.exports = app;
