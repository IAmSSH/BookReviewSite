var Book                    = require("/Programming/web-projects/BookReviewSite/models/book"),
    User                    = require("./models/User"),
    passportLocalMongoose   = require('passport-local-mongoose'),
    commentRoutes           = require("./routes/comments"),
    methodOverride          = require("method-override"),
    indexRoutes             = require('./routes/index'),
    LocalStrategy           = require('passport-local'),
    bookRoutes              = require("./routes/books"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require('passport'),
    express                 = require("express"),
    request                 = require("request"),
    app                     = express();

// SETUP CODE
mongoose.connect("mongodb://localhost/auth_test_branch");
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(commentRoutes);
app.use(bookRoutes);

app.listen(8080, function() {
    console.log("Magic happens at 8080...");
});