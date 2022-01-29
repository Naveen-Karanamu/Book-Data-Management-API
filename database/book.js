const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    authors: [Number],
    language: String,
    publishDate: {
        type: String,
        require: true
    },
    numOfPages: {
        type: Number,
        require: true
    },
    category: [String],
    publication: Number
});

// Creating the Model
const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;