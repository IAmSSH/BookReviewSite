var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    review: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model("Book", bookSchema);