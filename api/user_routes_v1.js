var express = require('express');
var routes = express.Router();
var userController = require('../controllers/userController');

module.exports = {}

routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getOneById);
routes.get('/users/getIDbyJoincode/:id', userController.getIDbyJoincode);
routes.post('/users/create', userController.create);
routes.post('/users/update/:id', userController.update);
routes.get('/users/delete/:id', userController.delete);
routes.get('/users/getAllMealsFromUser/:id');
routes.get('/users/getHouseFromUser/:id');

module.exports = routes;