//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let User = require("../app/models/user.js");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
     done();
    });
  });

  describe("/GET users", () => {
      it("it should GET all the users", (done) => {
        chai.request(server)
            .get("/users")
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("array");
                  res.body.length.should.be.eql(0);
              done();
            });
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

  describe("/GET/:id user", () => {
    it("it should GET a user by the given id", (done) => {
        let user = new User({
          first_name: "The Lord of the Rings",
          last_name: "J.R.R. Tolkien"
        });

        user.save((err, user) => {
            chai.request(server)
          .get("/users/" + user.id)
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("first_name");
                res.body.should.have.property("_id").eql(user.id);
                should.equal(res.body["email"], user.email);
                should.equal(res.body["first_name"], user.first_name);
                should.equal(res.body["last_name"], user.last_name);
            done();
          });
        });
    });
  });

  describe("/PUT/:id user", () => {
     it("it should UPDATE a user given the id", (done) => {
         let user = new User({
           first_name: "The Chronicles of Narnia",
           last_name: "C.S. Lewis"
         });

         user.save((err, user) => {
               chai.request(server)
               .put("/users/" + user.id)
               .send({
                 first_name: "The Chronicles of Narnia",
                 last_name: "C.S."
               })
               .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a("object");
                     should.equal(res.body["email"], user.email);
                     should.equal(res.body["first_name"], "The Chronicles of Narnia");
                     should.equal(res.body["last_name"], "C.S.");
                 done();
               });
         });
     });
  });

  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
        let user = new User({
          first_name: "The Chronicles of Narnia",
          last_name: "C.S. Lewis"
        });

        user.save((err, user) => {
              chai.request(server)
                  .delete("/users/" + user.id)
                  .end((err, res) => {
                        res.should.have.status(200);
                    done();
                  });
        });
    });
  });
});
