var db = require('../config/dbConnection');
module.exports = {
    getAll(req, res, next) {
        console.log('user.controller getAll');
        db.query('SELECT * FROM user', function (error, rows, fields) {
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
        console.log('user.controller getOneID');
        db.query('SELECT * FROM user WHERE ID =' + id, function (error, rows, fields) {
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

    getIDbyJoincode(req, res, next) {
        console.log('house.controller getIDFromJoinCode');
        db.query('SELECT ID FROM house WHERE JoinCode =' + req.params.id, function (error, rows, fields) {
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

    create(req, res, next) {
        console.log('house.controller Create');

        db.query('INSERT INTO house (Name, JoinCode) VALUES (?, ?)', [req.body.name, req.body.joinCode] , function (error, rows, fields) {
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
        console.log('house.controller Update');

        db.query('UPDATE house SET Name = ?, JoinCode = ?) WHERE ID = ?', [req.body.name, req.params.body, req.params.id] , function (error, rows, fields) {
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
        console.log('house.controller Delete');

        db.query('DELETE FROM house WHERE ID = ?', [req.params.id] , function (error, rows, fields) {
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

    getAllMealsFromUser(req, res, next) {
        const id = req.params.id;
        console.log('link.controller getMealsFromUser');
        db.query('SELECT * FROM meal WHERE ID IN (SELECT mealID FROM link_user_meal WHERE userID = ?)', [id] , function (error, rows, fields) {
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

    getHouseFromUser(req, res, next) {
        console.log('link.controller getHouseFromUser');
        db.query('SELECT * FROM house WHERE ID IN (SELECT houseID FROM link_house_user WHERE userID = ?)', [req.params.id] , function (error, rows, fields) {
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
    }
}