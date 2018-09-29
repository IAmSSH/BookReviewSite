<<<<<<< HEAD
var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
=======
var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
>>>>>>> auth-test-branch
    username: String,
    password: String
});

<<<<<<< HEAD
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
=======
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
>>>>>>> auth-test-branch
