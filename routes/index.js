var express = require('express'),
User        = require('../models/User'),
localStrategy           = require('passport-local'),
passport    = require('passport'),
passportLocalMongoose   = require('passport-local-mongoose'),
router      = express.Router();

// Show SIGN UP page
router.get('/books/register', function(req, res) {
    res.render('register');
})

// Show LOGIN age
router.get('/books/login', function(req, res) {
    res.render('login');
});

router.post('/books/register', function(req, res) {
    var username = new User({username: req.body.name});
    User.register(username, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect('/books/register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/books');
        });
    });
});

module.exports = router;