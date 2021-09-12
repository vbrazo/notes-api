//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../app/models/user.model.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    Note.remove({}, (err) => {
     done();
    });
  });

  describe('/POST users', () => {
    it('it should POST a user', (done) => {
        let note = {
            email: "voliveira@gmail.com",
            first_name: "Vitor",
            last_name: "Oliveira"
        }
      chai.request(server)
          .post('/users')
          .send(note)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
  });
});
