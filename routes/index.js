var express = require('express'),
User        = require('../models/User'),
passport    = require('passport'),
router      = express.Router();

// Show SIGN UP page
router.get('/books/register', function(req, res) {
    res.render('register');
})

// Show LOGIN age
router.get('/books/login', function(req, res) {
    res.render('login')
});

router.post('/books/register', function(req, res) {

})

module.exports = router;