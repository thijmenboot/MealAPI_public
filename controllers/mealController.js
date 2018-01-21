var db = require('../config/dbConnection');
module.exports = {
    getAll(req, res, next) {
        console.log('meal.controller getAll');
        db.query('SELECT * FROM meal', function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },
    getOneById(req, res, next) {
        const id = req.params.id;
        console.log('meal.controller getOneID');
        db.query('SELECT * FROM meal WHERE ID =' + id, function (error, rows1, fields) {
            if (error) {
                next(error);
            } else {
                db.query('SELECT * FROM user WHERE ID IN (SELECT userID FROM link_user_meal WHERE mealID = ?)', [id], function (error, rows, fields){

                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        meal: rows1,
                        users : rows
                    }).end();
                });
            };
        });
    },
    create(req, res, next) {
        console.log('meal.controller Create');

        db.query('INSERT INTO meal (MaxPeople, Dish, Chef, DateTime, Cost, Information, ImageURL) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.maxPeople, req.body.dish, req.body.chef, req.body.dateTime, req.body.cost, req.body.information, req.body.imageURL] , function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },
    update(req, res, next) {
        console.log('meal.controller Update');

        db.query('UPDATE meal SET MaxPeople = ?, Dish = ?, Chef = ?, DateTime = ?, Cost = ?, Information = ?, ImageURL = ?) WHERE ID = ?', [req.body.maxPeople, req.body.dish, req.body.chef, req.body.dateTime, req.body.cost, req.body.information, req.body.imageURL, req.params.id] , function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },
    delete(req, res, next) {
        console.log('meal.controller Delete');

        db.query('DELETE FROM meal WHERE ID = ?', [req.params.id] , function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },

    getAllUsersFromMeal(req, res, next) {
        console.log('link.controller getUserFromMeal');
        var id = req.params.id;
        db.query('SELECT * FROM user WHERE ID IN (SELECT userID FROM link_user_meal WHERE mealID = ?)', [id] ,function (error, rows, fields) {
        
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },
  
    addUserToMeal(req, res, next) {
        console.log('link.controller addUserToMeal');
        db.query('INSERT INTO link_user_meal (userID, mealID) VALUES (?, ?)', [req.params.userID, req.params.mealID] , function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },
}