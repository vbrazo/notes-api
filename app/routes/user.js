module.exports = (app) => {
    const users = require("../controllers/user.js");

    app.post("/users", users.create);
};
