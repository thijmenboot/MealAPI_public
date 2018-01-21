var db = require('../config/dbConnection');
module.exports = {
    getAll(req, res, next) {
        console.log('house.controller getAll');
        db.query('SELECT * FROM house', function (error, rows, fields) {
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
        console.log('house.controller getOneID');
        db.query('SELECT * FROM house WHERE ID =' + id, function (error, rows, fields) {
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

        db.query('UPDATE house SET Name = ?) WHERE ID = ?', [req.body.maxPeople, req.body.dish, req.body.chef, req.body.dateTime, req.body.cost, req.body.information, req.body.imageURL, req.params.id] , function (error, rows, fields) {
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

    getUsersFromHouse(req, res, next) {
        const id = req.params.id;
        console.log('link.controller getUsersFromHouse');
        db.query('SELECT * FROM user WHERE ID IN (SELECT userID FROM link_house_user WHERE houseID = ?', [req.params.id] , function (error, rows, fields) {
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

    addUserToHouse(req, res, next) {
        console.log('link.controller addUserToHouse');
        db.query('INSERT INTO link_house_user (houseID, userID) VALUES (?, ?)', [req.params.houseID, req.params.userID] , function (error, rows, fields) {
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