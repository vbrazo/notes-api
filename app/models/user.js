const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
