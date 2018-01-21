var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('testing login system', function () {
    it('Testing succesfull login', function (done) {
        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username': 'thijmen',
                'password': 'test123'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('token');

                chai.request(server)
                    .get('/api/v1/meals')
                    .set('X-Access-Token', res.body.token)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it('Testing failed login', function (done) {
        chai.request(server)
            .post('/login')
            .type('form')
            .send({
                'username': 'thijmen',
                'password': 'test321'
            })
            .end(function (err, res) {
                res.should.have.status(500);
                chai.request(server)
                    .get('/api/v1/meals')
                    .set('X-Access-Token', 'empty')
                    .end(function (err, res) {
                        res.should.have.status(401);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.equal('Not authorized');
                        done();
                    });
            });
    });
});