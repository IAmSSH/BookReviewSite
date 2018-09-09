var Book            = require("/Programming/web-projects/BookReviewSite/models/book"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    request         = require("request"),
    app             = express(),
    commentRoutes   = require("./routes/comments");
    bookRoutes      = require("./routes/books");

    // SETUP CODE
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + '/public'));
    mongoose.connect("mongodb://localhost/book_review_app");
    app.use(methodOverride('_method'));
    app.use(commentRoutes);
    app.use(bookRoutes);


    // seedDB();
    // var books = [
    //     {name: "Book1", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book2", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book3", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."}
    // ];

app.listen(8080, function() {
    console.log("Magic happens at 8080...");
});