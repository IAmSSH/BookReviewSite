var Book            = require("/Programming/web-projects/BookReviewSite/models/book"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    request         = require("request"),
    app             = express(),
    gBookImage;

    // SETUP CODE
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + '/public'));
    mongoose.connect("mongodb://localhost/book_review_app");
    app.use(methodOverride('_method'));


    // seedDB();
    // var books = [
    //     {name: "Book1", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book2", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book3", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."}
    // ];


// ROUTES

// ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/books");
});
app.get("/books", function(req, res) {
    Book.find({}, function(err, books) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {books: books});
        }
    });
});

app.get("/books/new/:bookName", function(req, res) {
    var bookName  = req.params.bookName;
    var bookImage = req.params.bookImage;
    res.render("new", {bookName: bookName, bookImage: bookImage});
});

// CREATE ROUTE
app.post("/books/create", function(req, res) {
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
app.get("/books/search", function(req, res) {
    res.render("search");
});

// FIND BOOK
app.get("/books/find", function(req, res) {
    var book = req.query.bookName;
    console.log(book);
    var regex = / /gi;
    book = book.replace(regex, '+');
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render('result', {data: data.items});
        }
    });
});

// SHOW ROUTE
app.get("/books/:id", function(req, res) {
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log("Error finding book");
            console.log(err);
        } else {
            res.render("show", {book: foundBook});
        }
    });
});

// EDIT ROUTE
app.get('/books/:id/edit', function(req, res){
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log("Eror finding" + err);
        } else{
            res.render("edit", {book: foundBook});
        }
    });
});

// UPDATE ROUTE
app.put("/books/:id", function(req, res) {
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
app.delete("/books/:id", function(req, res) {
    Book.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log("error deleting " + err);
        } else {
            res.redirect("/books");
        }
    });
});

app.listen(8080, function() {
    console.log("Magic happens at 8080...");
});