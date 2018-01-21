var express = require('express');
var routes = express.Router();
var houseController = require('../controllers/houseController');

module.exports = {}

routes.get('/houses', houseController.getAll);
routes.get('/houses/:id', houseController.getOneById);
routes.post('/houses/create', houseController.create);
routes.post('/houses/update/:id', houseController.update);
routes.get('/houses/delete/:id', houseController.delete);
routes.get('/houses/getUsersFromHouse/:id', houseController.getUsersFromHouse);
routes.get('/houses/addUserToHouse/:houseID/:userID', houseController.addUserToHouse);

module.exports = routes;