const User = require("../models/user.js");

exports.create = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }

    const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};
