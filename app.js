var Book                    = require("/Programming/web-projects/BookReviewSite/models/book"),
    passportLocalMongoose   = require('passport-local-mongoose'),
    commentRoutes           = require("./routes/comments"),
    methodOverride          = require("method-override"),
    bookRoutes              = require("./routes/books"),
    localStrategy           = require('passport-local'),
    indexRoutes             = require('./routes/index'),
    User                    = require('./models/User'),
    bodyParser              = require("body-parser"),
    passport                = require('passport'),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    request                 = require("request"),
    app                     = express();

    // SETUP CODE
    mongoose.connect("mongodb://localhost/book_review_app");
    app.use(methodOverride('_method'));
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + '/public'));
    
    app.use(require('express-session')({
        secret: 'I love Coooding',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(indexRoutes);
    app.use(bookRoutes);
    app.use(commentRoutes);


    // seedDB();
    // var books = [
    //     {name: "Book1", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book2", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."},
    //     {name: "Book3", image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, assumenda."}
    // ];

app.listen(8080, function() {
    console.log("Magic happens at 8080...");
});