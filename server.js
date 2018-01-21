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

app.use('/login', function(req, res, next){
	auth.authUser(req.body.username, req.body.password, function(error, success) {
		if(success){
			res.status(200)
			.json({
				token: auth.encodeToken(req.body.username)
			}).end();
		}
		else{
			res.status(500)
			.json({
				error: "Error: " + error
			}).end();	
		}
	});
});

app.use('/register', function(req, res, next){
	auth.registerUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password, function(error, success) {
		if(success){
			res.status(200)
			.json({
				message: "Succesfully registered user."
			}).end();
		}
		else{
			res.status(500)
			.json({
				error: "Error: " + error
			}).end();	
		}
	});
});

app.all(new RegExp("[^(\/login)]"), function(req, res, next){
	res.contentType('application/json');

	var token = (req.header('X-Access-Token')) || '';
	auth.decodeToken(token, function (err, payload) {
		if (err){
			console.log(err.message);
			res.status((err.status || 401 )).json({error: new Error("Not authorized").message});
		}
		else{
			next();
		}
	});
});

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
