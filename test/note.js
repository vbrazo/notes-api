//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../app/models/note.model.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Notes', () => {
    beforeEach((done) => {
        Note.remove({}, (err) => {
           done();
        });
    });

  describe('/GET note', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});
