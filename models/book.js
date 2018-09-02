var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    review: String
});

module.exports = mongoose.model("Book", bookSchema);