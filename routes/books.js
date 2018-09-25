var Book = require('../models/book')
    express = require('express'),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Comment = require("../models/comment"), 
    router = express.Router();

// NEW ROUTE
router.get("/books/new/:bookName", function(req, res) {
    var bookName  = req.params.bookName;
    var bookImage = req.params.bookImage;
    res.render("books/new", {bookName: bookName, bookImage: bookImage});
});

// CREATE ROUTE
router.post("/books/create", function(req, res) {
    var newBook = req.body.book;
    Book.create(newBook, function(err, book) {
        if(err) {
            console.log("Error creating book");
            console.log(err);
        } else {
            res.redirect("/books");
        }
    });
});

// SEARCH PAGE RENDER
router.get("/books/search", function(req, res) {
    res.render("books/search");
});

// FIND BOOK
router.get("/books/find", function(req, res) {
    var book = req.query.bookName;
    console.log(book);
    var regex = / /gi;
    book = book.replace(regex, '+');
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("books/result", {data: data.items});
        }
    });
});

// SHOW ROUTE
router.get("/books/:id", function(req, res) {
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook) {
        if(err) {
            console.log("Error finding book");
            console.log(err);
        } else {
            res.render("books/show", {book: foundBook});
        }
    });
});

// EDIT ROUTE
router.get('/books/:id/edit', function(req, res){
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log("Eror finding" + err);
        } else{
            res.render("books/edit", {book: foundBook});
        }
    });
});

// UPDATE ROUTE
router.put("/books/:id", function(req, res) {
    Book.findByIdAndUpdate(req.params.id, req.body.book,function(err, updatedBook) {
        if(err) {
            console.log("Error updating");
            console.log(log);
        } else {
            res.redirect('/books/'+ req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/books/:id", function(req, res) {
    Book.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log("error deleting " + err);
        } else {
            res.redirect("/books");
        }
    });
});

module.exports = router;