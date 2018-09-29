<<<<<<< HEAD
var passportLocalMongoose   = require('passport-local-mongoose'),
    User                    = require('../models/User'),
    localStrategy           = require('passport-local'),
    Book                    = require('../models/book'),
    passport                = require('passport'),
    express                 = require('express'),
    router                  = express.Router();

// ROOT ROUTE
router.get("/", function(req, res) {
    res.redirect("/books");
});
router.get("/books", function(req, res) {
    Book.find({}, function(err, books) {
        if(err) {
            console.log(err);
        } else {
            res.render("books/index", {books: books});
        }
    });
});

// REGISTER ROUTE
router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    var username = new User({username: req.body.name});
    
    User.register(username, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect('/register');
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/books');
            });
        }        
    });
});

// Show LOGIN age
router.get('/books/login', function(req, res) {
    res.render('login');
=======
var Book = require('../models/book')
    express = require('express'),
    mongoose = require("mongoose"),
    User = require('../models/User'),
    passport = require('passport'),
    router = express.Router();

// REGISTER ROUTE
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", (req, res) => {
    var username = new User({username: req.body.username});
    User.register(username, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/books");
        });
    });
});

// LOGIN ROUTE
router.get("/login", function(req, res) {
    res.send("Login Route");
>>>>>>> auth-test-branch
});

module.exports = router;