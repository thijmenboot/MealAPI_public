var jwt = require('jwt-simple');
var config = require('../config/config');
var moment = require('moment');
var db = require('../config/dbConnection');

module.exports = {
    encodeToken(username) {
        const payload = {
            exp: moment().add(10, 'minutes').unix(),
            iat: moment().unix(),
            sub: username
        };
        return jwt.encode(payload, config.secret);
    },
    decodeToken(token, cb) { 
        try{
            const payload = jwt.decode(token, config.secret);
    
            const now = moment().unix();
    
            if(now > payload.exp) {
                console.log('Expired token.');
            }
    
            cb(null, payload);
        } catch(err) {
            cb(err, null);
        }
    },
    authUser(username, password, callback){
        var query = "SELECT * FROM user WHERE Username = ? AND Password = ?";
        var result = db.query(query, [username, password], function (error, results) {
            if(error){
                callback(error, false);
            }

            if(results.length > 0){
                callback(null, true);
            }
            else{
                callback(null, false);
            }
        });
    },
    registerUser(firstname, lastname, username, password, callback){
        var query = "INSERT INTO user (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)";
        db.query(query, [firstname, lastname, username, password], function (error, results) {
            console.log("user created with name: " + username);
            if(error){
                callback(error, false)
            }

            else{
                callback(null, true);
            }
        });
    }
}