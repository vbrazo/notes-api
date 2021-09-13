//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let Note = require("../app/models/user.js");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    Note.remove({}, (err) => {
     done();
    });
  });

  describe("/POST users", () => {
    it("it should POST a user", (done) => {
      let user = {
          email: "voliveira@gmail.com",
          first_name: "Vitor",
          last_name: "Oliveira"
      };

      chai.request(server)
          .post("/users")
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                should.equal(res.body["email"], user["email"]);
                should.equal(res.body["first_name"], user["first_name"]);
                should.equal(res.body["last_name"], user["last_name"]);
            done();
          });
    });
  });
});
