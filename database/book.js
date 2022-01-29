const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [Number],
    language: String,
    publishDate: {
        type: String,
        required: true
    },
    numOfPages: {
        type: Number,
        required: true
    },
    category: [String],
    publication: Number
});

// Creating the Model
const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;