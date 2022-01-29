const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength:1
    },
    title: {
        type: String,
        required: true,
        minLength:2
    },
    authors: [Number],
    language: String,
    publishDate: {
        type: String,
        required: true,
        minLength:4
    },
    numOfPages: {
        type: Number,
        required: true,
        minLength:4
    },
    category: [String],
    publication: Number
});

// Creating the Model
const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;