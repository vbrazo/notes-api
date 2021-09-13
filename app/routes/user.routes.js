module.exports = (app) => {
    const users = require("../controllers/user.controller.js");

    app.post("/users", users.create);
};
