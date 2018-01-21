// 
var http = require('http');
var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser')
var logger = require('morgan');

var meal_routes_v1 = require('./api/meal_routes_v1');
var user_routes_v1 = require('./api/user_routes_v1');
var house_routes_v1 = require('./api/house_routes_v1');

var config = require('./config/config');

var app = express();
var auth = require('./controllers/authController');

app.set('superSecret', config.secret);
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var PORT = process.env.PORT || 4001;

app.use('/api/v1', meal_routes_v1);
app.use('/api/v1', user_routes_v1);
app.use('/api/v1', house_routes_v1);

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
