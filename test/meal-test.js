var chai = require('chai');
var chaiHttp = require('chai-http');
var moment = require('moment');
var server = require('../server');
var db = require('../config/dbConnection');
var chould = chai.should();

chai.use(chaiHttp);

describe('testing meal systems', function () {
    it('Test creating a meal', function (done) {
        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username': 'thijmen',
                'password': 'test123'
            })
            .end(function (err, res) {
                res.should.have.status(200);

                chai.request(server)
                    .post('/api/v1/meals/create')
                    .set('X-Access-Token', res.body.token)
                    .type('form')
                    .send({
                        "maxPeople": 10,
                        "dish": "Mom's Spaghetti",
                        "chef": "npm package manager",
                        "dateTime": "2017-01-21 14:15:00",
                        "cost": 1337,
                        "information": "This is a test dish",
                        "imageURL": "www.google.com"
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);

                        db.query('DELETE FROM meal WHERE dateTime = ?', ["2017-01-21 14:15:00"] , function (error, rows, fields) {
                        });

                        done();
                    });
            });
    });

    it('Test getting meal by id', function (done) {
        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username': 'thijmen',
                'password': 'test123'
            })
            .end(function (err, res) {
                res.should.have.status(200);

                chai.request(server)
                    .get('/api/v1/meals/1')
                    .set('X-Access-Token', res.body.token)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('meal');
                        res.body.meal[0].should.have.property('Chef');
                        res.body.meal[0].Chef.should.equal('Ramsey');
                        done();
                    });
            });
    });
});