var express = require('express');
var routes = express.Router();
var mealController = require('../controllers/mealController');

module.exports = {}

routes.get('/meals', mealController.getAll);
routes.get('/meals/:id', mealController.getOneById);
routes.post('/meals/create', mealController.create);
routes.post('/meals/update/:id', mealController.update);
routes.get('/meals/delete/:id', mealController.delete);
routes.get('/meals/getAllUsersFromMeal/:id', mealController.getAllUsersFromMeal);
routes.get('/meals/addUserToMeal/:userID/:mealID', mealController.addUserToMeal);

module.exports = routes;