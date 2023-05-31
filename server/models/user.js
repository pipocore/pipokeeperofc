const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var keptSchema = new mongoose.Schema({
    title: {type: String, required: true},
    pass: {type: String, required: true},
    usernametokeep: {type: String, required: true},
})
var User = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {
        type: String,
        unique: true},
    password: String,
    date: {
        type: Date, default: Date.now},

    keptpasses: [keptSchema],
})

User.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);